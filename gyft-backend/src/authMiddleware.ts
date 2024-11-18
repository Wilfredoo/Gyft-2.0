import { Request, Response, NextFunction } from 'express';
import { admin } from './firebase';

export interface AuthenticatedRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

export const verifyFirebaseIdToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    console.log("verifyFirebaseIdToken verifyFirebaseIdToken verifyFirebaseIdToken")
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        res.status(401).json({ code: 'AUTH_MISSING_TOKEN', message: 'No token provided' });
        return;
    }

    const idToken = authorization.split('Bearer ')[1];
    try {
        console.log("trying!!")
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken; 
        next();
    } catch (error: any) {
        if (error.code === 'auth/id-token-expired') {
            res.status(401).json({ code: 'AUTH_TOKEN_EXPIRED', message: 'Token expired' });
        } else {
            console.error('Error verifying Firebase ID token:', error);
            res.status(401).json({ code: 'AUTH_INVALID_TOKEN', message: 'Invalid token' });
        }
    }
};
