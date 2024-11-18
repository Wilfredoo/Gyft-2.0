import { Request } from 'express';
import { admin } from '../src/firebase';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

declare global {
    namespace Express {
        interface Request {
            user?: admin.auth.DecodedIdToken;
        }
    }
}
