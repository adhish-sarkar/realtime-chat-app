import { Server as SocketIOServer } from 'socket.io';
import Messages from './models/MessagesModel.js';
import Channel from './models/ChannelModel.js';

const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            credentials: true
        }
    });

    const disconnect = (socket) => {
        console.log(`Disconnecting socket: ${socket.id}`);
        for(const [userId, socketId] of userSocketMap.entries()){
            if(socketId === socket.id){
                userSocketMap.delete(userId);
                console.log(`Deleted user: ${userId}`);
                break;
            }
        }
    };

    const sendMessage = async (message) => {
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);

        const createdMessage = await Messages.create(message);
        const messageData = await Messages.findById(createdMessage._id)
        .populate('sender', 'id  email firstName lastName image color')
        .populate('recipient', 'id  email firstName lastName image color');
        console.log(messageData);
        if(recipientSocketId){
            io.to(recipientSocketId).emit("recieveMessage", messageData);
        }
        if(senderSocketId){
            io.to(senderSocketId).emit("recieveMessage", messageData);
        }
    }

    const sendChannelMessage = async (message) => {
        const { channelId, sender, content, messageType, fileUrl } = message;

        const createdMessage = await Messages.create({
            sender,
            recipient: null,
            content,
            messageType,
            timeStamps: new Date(),
            fileUrl,
        });

        const messageData = await Messages.findById(createdMessage._id)
        .populate('sender', 'id  email firstName lastName image color')
        .exec();

        await Channel.findByIdAndUpdate(channelId, {
            $push: { messages: createdMessage._id },
        });

        const channel = await Channel.findById(channelId).populate("members");

        const finalData = {
            ...messageData._doc,
            channelId: channel._id,
        }

        if(channel && channel.members){
            console.log(channel.members);
            channel.members.forEach((member) => {
                const memberSocketId = userSocketMap.get(member._id);
                if(memberSocketId){
                    io.to(memberSocketId).emit("recieveChannelMessage", finalData);
                }
            });
            const adminSocketId = userSocketMap.get(channel.admin._id.toString());
            if(adminSocketId){
                io.to(adminSocketId).emit("recieveChannelMessage", finalData);
            }
        }

    }
    const userSocketMap = new Map();
    
    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket id: ${socket.id}`);
        }else {
            console.log("User id not provided during connection");
        }
        socket.on('sendMessage', (message) => {
            sendMessage(message);
        });
        socket.on("sendChannelMessage", (message) => {
            sendChannelMessage(message);
        });
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${userId}`);
            disconnect(socket)
        });
    });
};

export default setupSocket;