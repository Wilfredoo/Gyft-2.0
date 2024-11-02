import express, { Request, Response } from 'express'
import User from '../models/User'
import { verifyFirebaseIdToken } from '../authMiddleware';

const router = express.Router()

// router.post('/', verifyFirebaseIdToken, async (req, res) => {
//     try {
//         const { name, phoneNumber, email, birthday } = req.body;

//         const newUser = new User({
//             name,
//             phoneNumber,
//             email,
//             birthday
//         });

//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating user', error });
//     }
// });

// router.get('/:id', verifyFirebaseIdToken, async (req: Request, res: Response) => {
//     try {
//         const user = await User.findById(req.params.id);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user);
        
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching user', error });
//     }
// });


// router.get('/', verifyFirebaseIdToken, async (req: Request, res: Response) => {
//     try {
//         const users = await User.find()

//         if (users.length === 0) {
//             return res.status(404).json({ message: "No Users found" })
//         }

//         res.status(200).json(users)
//     } catch (error) {
//         return res.status(500).json({ message: "Error while fetching users", error })
//     }
// })

export default router