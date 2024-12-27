import express, { Request, Response } from 'express'
import User from '../models/User'
import { verifyFirebaseIdToken, AuthenticatedRequest } from '../authMiddleware';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router()

router.post('/', verifyFirebaseIdToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {

  console.log("VERIFYYYYY TOKEN route has been called")
  try {
    res.status(200).json({
      message: 'Token verified successfully',
      user: req.user, // Access the decoded token attached by the middleware
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'Unexpected error occurred', error });
  }
});

router.post('/checkUser', verifyFirebaseIdToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  console.log("checkUser was called in the backend");

  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      res.status(400).json({ message: 'Phone number is required' });
      return
    }

    const user = await User.findOne({ phoneNumber });

    if (user) {
      res.status(200).json({ isNewUser: false });
    } else {
      res.status(200).json({ isNewUser: true });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.post('/register', verifyFirebaseIdToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  console.log("register route has been called");
  console.log("Request body:", req.body); // Log the incoming request body

  try {
    const { phoneNumber } = req.body;

    // Check if the phone number is provided
    if (!phoneNumber) {
      res.status(400).json({ message: 'Phone number is required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
    }

    // Generate a unique username
    let username = `user-${uuidv4().slice(0, 8)}`; // Generate a unique username using UUID
    console.log("Generated username:", username);

    // Ensure the username is unique in the database
    while (await User.findOne({ username })) {
      username = `user-${uuidv4().slice(0, 8)}`; // Regenerate if not unique
    }

    // Create a new user
    const newUser = new User({ phoneNumber, username });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

export default router