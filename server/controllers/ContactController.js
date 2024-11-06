import User from "../models/UserModel.js";

export const searchContact = async (req, res, next) => {
    try {
        const { searchTerm } = req.body;

        if(!searchTerm) {
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

