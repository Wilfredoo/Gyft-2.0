import mongoose, {Document, Schema} from 'mongoose'

// interface for the user document
export interface IUser extends Document {
    name: string;
    phoneNumber: string;
    createdAt: Date;
    birthday?: Date;
}

// user mongoose schema
const UserSchema: Schema = new Schema({
    name: { type: String, required: true},
    phoneNumber: {type: String, required: true, unique: true},
    email: {type: String, unique: true},
    createdAt: {type: Date, default: Date.now},
    birthday: {type: Date}
})

export default mongoose.model<IUser>('User', UserSchema)