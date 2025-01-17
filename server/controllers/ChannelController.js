import Channel from "../models/ChannelModel.js";
import User from "../models/UserModel.js";

export const createChannel = async (req, res, next) => {
    try {
        const { name, members, isPrivate } = req.body;
        const userId = req.userId;
        const admin = await User.findById(userId);

        if (!admin) {
            return res.status(400).json({ message: "Admin user not found" });
        }

        const validMembers = await User.find({ _id: { $in: members } });

        if (validMembers.length !== members.length) {
            return res.status(400).json({ message: "Some members are not valid user" });
        }

        const newChannel = new Channel({
            name,
            members,
            admin: userId,
        });

        await newChannel.save();

        return res.status(201).json({
            message: "Channel created successfully",
            channel: newChannel
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserChannels = async (req, res, next) => {
    try {
        const userId = req.userId;
        const channels = await Channel.find(
            {
                $or: [
                    { admin: userId },
                    { members: userId }
                ],
            }
        ).sort({ updatedAt: -1 });

        return res.status(200).json({ channels });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getChannelMessages = async (req, res, next) => {
    try {
        const {channelId} = req.params;
        const channel = await Channel.findById(channelId).populate("members").populate({
            path: "messages",
            populate: {
                path: "sender",
                select: "id email firstName lastName image color",
            },
        });
        if(!channel){
            return res.status(404).json({message: "Channel not found"});
        }
        return res.status(200).json({messages: channel.messages});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}