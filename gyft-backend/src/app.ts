import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'
import giftsRouter from './routes/gifts';
import usersRouter from './routes/users'
import verifyTokenRouter from './routes/users'

import cors from 'cors';

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000',    
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Authorization', 'Content-Type'],  
}));

app.use('/api/gifts', giftsRouter);
app.use('/api/users', usersRouter)
app.use('/api/verify-token', verifyTokenRouter);

mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err))

app.get('/', (req, res) => {
    res.send("Welcome to Gyft backend. A place full of wonder, mystery and love.")
});

export default app;
