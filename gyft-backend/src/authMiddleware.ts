import { Request, Response, NextFunction } from 'express';
import { admin } from './firebase';



export interface AuthenticatedRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

export const verifyFirebaseIdToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }

    const idToken = authorization.split('Bearer ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken; 
        next();
    } catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
        return 
    }
};
