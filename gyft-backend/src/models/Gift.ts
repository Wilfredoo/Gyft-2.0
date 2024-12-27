import mongoose, {Document, Schema} from 'mongoose'

export interface IGift extends Document {
    title: string;
    description?: string;
    createdAt: Date;
    userId: { type: String, required: true },
    isDefault?: boolean;
}

const GiftSchema: Schema = new Schema({
    title: { type: String, required: true},
    description: {type: String},
    dateAdded: {type: Date, default: Date.now},
    userId: {
        type: String,
        required: function (this: { isDefault: boolean }) {
            return !this.isDefault;
        },
    },
    isDefault: { type: Boolean, default: false },
})

export default mongoose.model<IGift>('Gift', GiftSchema)