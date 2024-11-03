import e from 'express';
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { renameSync, unlinkSync } from 'fs';

const tokenAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
        expiresIn: tokenAge
    });
}

export const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!  Use another email to register' });
        }
        const user = await User.create({ email, password });
        res.cookie('jwt', createToken(email, user._id), {
            httpOnly: true,
            maxAge: tokenAge,
            sameSite: 'none',
            secure: true
        });
        res.status(201).json({ user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

export const getuserInfo = async (req, res, next) => {
    try {
        console.log(req.userId);
        const userData = await User.findById(req.userId);
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user: userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });

    }


}
export const updateProfile = async (req, res, next) => {
    try {
        const { userId } = req;
        const { firstName, lastName, color } = req.body;
        if (!firstName || !lastName || !color) {
            return res.status(400).json({ message: "Firstname, Lastname and color is required." });
        }
        console.log(req.userId);
        const updateData = await User.findByIdAndUpdate(userId, {
            firstName, lastName, color, profileSetup: true
        }, { new: true, runValidators: true });
        if (!updateData) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user: updateData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

export const addProfileImage = async (req, res, next) => {
    try {
        const { userId } = req;
        if (!req.file) {
            return res.status(400).json({ message: "Profile image is required." });
        }
        const date = Date.now();
        let fileName = "uploads/profiles/" + date + req.file.originalname;
        fileName = fileName.split(" ").join("-");
        renameSync(req.file.path, fileName);

        const updatedUser = await User.findByIdAndUpdate(userId, {
            image: fileName
        }, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });

    }
}

export const removeProfileImage = async (req, res, next) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        if(!user.image){
            return res.status(404).json({message: "No image found"});
        }

        if( user.image){
            unlinkSync(user.image);
        }
        user.image = null;
        await user.save();
        return res.status(200).json({message: "Image removed successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });

    }
}