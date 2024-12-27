import mongoose, {Document, Schema} from 'mongoose'

// interface for the user document
export interface IUser extends Document {
    phoneNumber: string;
    createdAt: Date;
}

// user mongoose schema
const UserSchema: Schema = new Schema({
    phoneNumber: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now},
})

export default mongoose.model<IUser>('User', UserSchema)