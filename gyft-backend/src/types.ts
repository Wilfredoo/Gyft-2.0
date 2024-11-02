import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: any; // Adjust `any` to the actual user type if known
}
