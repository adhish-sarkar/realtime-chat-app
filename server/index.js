import { configDotenv } from 'dotenv';
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoutes.js';
import contactRoutes from './routes/ContactRoutes.js';
import setupSocket from './socket.js';
import messagesRoutes from './routes/MessagesRoutes.js';

configDotenv();

const app = express();
const port = process.env.PORT || 3001;
const database = process.env.DATABASE_URL;

app.use(cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT','PATCH' , 'DELETE'],
    credentials: true
}));

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use("/api/contacts",contactRoutes);
app.use("/api/messages",messagesRoutes);

mongoose.connect(database).then(() => {
    console.log('Database connected');
}).catch((err) => { console.log("*************** Failed to connect to database ***************\n",err); return; });

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

setupSocket(server);