import { User } from "@/domain/entities/User";
import { Schema, model, Document } from "mongoose";

export interface UserDocument extends User, Document {}

const UserSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
}, {
    timestamps: true
});

export const UserModel = model<UserDocument>('User', UserSchema);