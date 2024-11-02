import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'
import giftsRouter from './routes/gifts';
import usersRouter from './routes/users'

dotenv.config()

const app = express()

//Middleware
app.use(express.json())

app.use('/api/gifts', giftsRouter);
app.use('/api/users', usersRouter)


console.log("mongo uri", process.env.MONGODB_URI)

//Mongo connection
mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err))

//Routes
app.get('/', (req, res) => {
    res.send("Welcome to Gyft backend. A place full of wonder, mystery and love.")
});

export default app;
