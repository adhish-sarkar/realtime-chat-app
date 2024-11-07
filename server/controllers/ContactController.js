import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Messages from "../models/MessagesModel.js";

export const searchContact = async (req, res, next) => {
    try {
        const { searchTerm } = req.body;

        if (!searchTerm) {
            return res.status(400).json({ message: "Search term is required" });
        }
        const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const regex = new RegExp(sanitizedSearchTerm, "i");

        const contacts = await User.find({
            $and: [
                { _id: { $ne: req.userId } },
                {
                    $or: [
                        { firstName: regex },
                        { email: regex },
                        { lastName: regex }
                    ]
                }
            ],
        });

        return res.status(200).json({ contacts });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const getContactsForDmList = async (req, res, next) => {
    try {
        let { userId } = req;

        console.log(userId);
        userId = new mongoose.Types.ObjectId(userId);
        console.log(userId);

        const contacts = await Messages.aggregate([
            { $match: { $or: [{ sender: userId }, { recipient: userId }] } },
            { $sort: { timeStamps: -1 } },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$sender", userId] },
                            then: "$recipient",
                            else: "$sender"
                        }
                    },
                    lastMessageTime: { $first: "$timeStamps" }
                }
            },
            { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "contactInfo" } },
            { $unwind: "$contactInfo" },
            {
                $project: {
                    _id: 1,
                    lastMessageTime: 1,
                    firstName: "$contactInfo.firstName",
                    lastName: "$contactInfo.lastName",
                    email: "$contactInfo.email",
                    image: "$contactInfo.image",
                    color: "$contactInfo.color",
                }
            },
            { $sort: { lastMessageTime: -1 } }
        ]);
        return res.status(200).json({ contacts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });

    }
}

export const getAllContacts = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.userId } }, "firstName lastName _id email image color");
        const contacts = users.map(user => (
            {
                label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
                value: user._id,
            }
        ));
        return res.status(200).json({ contacts });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
