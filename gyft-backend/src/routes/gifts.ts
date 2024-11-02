import express, { Request, Response } from 'express'
import Gift from '../models/Gift'
import { verifyFirebaseIdToken } from '../authMiddleware';
import { AuthenticatedRequest } from '../types';

const router = express.Router()

router.post('/', verifyFirebaseIdToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { title, description, occasion, userId } = req.body;
        const newGift = new Gift({ title, description, occasion, userId });
        const savedGift = await newGift.save();
        res.status(201).json(savedGift);
    } catch (error) {
        res.status(500).json({ message: 'Error creating gift', error });
    }
});

// router.get('/:userId', verifyFirebaseIdToken, async (req: AuthenticatedRequest, res: Response) => {
//     try {

//         const gifts = await Gift.find({ userId: req.params.userId })

//         if (!gifts.length) {
//             return res.status(404).json({ message: 'No gift found for this user' });

//         }
//         res.status(200).json(gifts)

//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching gifts', error })
//     }
// })

export default router;