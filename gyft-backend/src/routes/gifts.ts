import express, { Request, Response } from 'express';
import Gift from '../models/Gift';
import { verifyFirebaseIdToken } from '../authMiddleware';
import { AuthenticatedRequest } from '../types';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    console.log("POST route / gift")
    try {
        const { title, description, userId } = req.body;
        console.log("req.body", req.body)

        if (!title || !userId) {
            res.status(400).json({ message: "Title and userId are required." });
        }
        if (typeof req.body.userId !== 'string') {
            res.status(400).json({ error: 'Invalid userId' });
        }

        // Create and save gift
        const newGift = new Gift({ title, description, userId });
        const savedGift = await newGift.save();
        res.status(201).json(savedGift);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // Handle Mongoose ValidationError
            console.error("Validation error:", error.errors);
            res.status(400).json({ message: "Invalid input", details: error.errors });
        } else if (error instanceof Error) {
            // Handle other errors
            console.error("Error creating gift:", error);
            res.status(500).json({ message: 'Error creating gift', error: error.message });
        }

        // Fallback for unexpected error types
        console.error("Unexpected error:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
});

router.get('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    console.log("get / gifts")
    try {
        console.log("Fetching gifts for request:", req.query);

        const { userId } = req.query;
        if (!userId || typeof userId !== 'string') {
            console.warn("Invalid or missing userId:", userId);
            res.status(400).json({ message: "userId is required and must be a string" });
        }

        console.log("Finding gifts for userId:", userId);

        const gifts = await Gift.find({
            $or: [
                { userId },
                { isDefault: true }
            ],
        });


        res.status(200).json(gifts);
    } catch (error) {
        console.error("Error fetching gifts:", error);
        res.status(500).json({ message: 'Error fetching gifts', error });
    }
});

router.delete('/:id', verifyFirebaseIdToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
             res.status(400).json({ message: "Gift ID is required" });
        }

        const deletedGift = await Gift.findByIdAndDelete(id);

        if (!deletedGift) {
             res.status(404).json({ message: "Gift not found" });
        }

        res.status(200).json({ message: "Gift deleted successfully", gift: deletedGift });
    } catch (error) {
        console.error("Error deleting gift:", error);
        res.status(500).json({ message: "Error deleting gift", error });
    }
});

export default router;
