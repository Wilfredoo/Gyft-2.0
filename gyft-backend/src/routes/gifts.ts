import express, { Request, Response } from 'express'
import Gift from '../models/Gift'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
    try {

        const { title, description, occasion, userId } = req.body

        const newGift = new Gift({
            title, description, occasion, userId
        })

        const savedGift = await newGift.save()
        res.status(201).json(savedGift);
    } catch (error) {
        res.status(500).json({ message: 'Error creating gift', error })
    }
})

router.get('/:userId', async (req: Request, res: Response) => {
    try {

        const gifts = await Gift.find(req.params.userId)

        if (!gifts.length) {
            return res.status(404).json({ message: 'No gift found for this user' });

        }
        res.status(200).json(gifts)

    } catch (error) {
        res.status(500).json({ message: 'Error fetching gifts', error })
    }
})