import Messages from "../models/MessagesModel.js";
import { mkdirSync, renameSync } from 'fs'
export const getMessages = async (req, res, next) => {
    try {
        const user1 = req.userId;
        const user2 = req.body.userId;
        if (!user1 || !user2) {
            return res.status(400).json({ message: "Both user IDs are required" });
        }
        const messages = await Messages.find({
            $or: [
                { sender: user1 }, { receiver: user2 },
                { sender: user2 }, { receiver: user1 }
            ],
        }).sort({ timestamp: 1 });
        return res.status(200).json({ messages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const uploadFile = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "File is required" });
        }
        const date = Date.now();
        let fileDir = `uploads/files/${date}`;
        fileDir = fileDir.replace(/\\/g, "/");
        let fileName = `${fileDir}/${file.originalname}`;

        mkdirSync(fileDir, { recursive: true });
        renameSync(file.path, fileName);

        return res.status(200).json({ filePath: fileName });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}