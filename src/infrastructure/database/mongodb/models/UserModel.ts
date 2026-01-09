import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
    name: string;
    email: string;
    hashedPassword: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    hashedPassword: { type: String, required: true },
}, {
    virtuals: true,
    timestamps: true,
    collection: 'users'
});

export const UserModel = model<UserDocument>('User', UserSchema);