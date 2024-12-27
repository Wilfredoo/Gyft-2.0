import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'
import giftsRouter from './routes/gifts';
import usersRouter from './routes/users'
import verifyTokenRouter from './routes/users'
import Gift from './models/Gift';
import cors from 'cors';

const seedDefaultGifts = async () => {
    const defaultGifts = [
        { title: "Any Headphones", description: "Any headphones really, mine broke yesterday.", isDefault: true },
        { title: "Cat", description: "I always wanted a cat but I never got one.", isDefault: true },
        { title: "Wheel for my car", description: "Long shot but if anyone has an extra wheel I can use it.", isDefault: true },
    ];

    for (const gift of defaultGifts) {
        const existingGift = await Gift.findOne({ title: gift.title, isDefault: true });
        if (!existingGift) {
            await Gift.create(gift);
        }
    }

    console.log('Default gifts seeded successfully!');
};

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

seedDefaultGifts();


export default app;
