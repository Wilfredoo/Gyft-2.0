import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

//Middleware
app.use(express.json())

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