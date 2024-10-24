import mongoose, {Document, Schema} from 'mongoose'

// interface for the user document
export interface IGift extends Document {
    title: string;
    description?: string;
    occasion: 'Birthday' | 'Christmas' | 'No Occasion' | string;
    createdAt: Date;
    userId: mongoose.Types.ObjectId;
}

// user mongoose schema
const GiftSchema: Schema = new Schema({
    title: { type: String, required: true},
    description: {type: String},
    occasion: {type: String},
    dateAdded: {type: Date, default: Date.now},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

export default mongoose.model<IGift>('Gift', GiftSchema)