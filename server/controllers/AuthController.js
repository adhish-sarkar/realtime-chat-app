import e from 'express';
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        res.cookie('token', createToken(email, user._id), {
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

export const signIn = async (req, res) => {
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