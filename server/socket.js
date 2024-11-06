import { Server as SocketIOServer } from 'socket.io';
import Messages from './models/MessagesModel.js';

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
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${userId}`);
            disconnect(socket)
        });
    });
};

export default setupSocket;