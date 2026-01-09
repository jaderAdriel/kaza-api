import { Token } from "@/domain/entities/TokenEntity";
import { Schema, model, Document } from "mongoose";

export interface TokenDocument extends Document, Token {}

const TokenSchema = new Schema<TokenDocument>({
    hash: { 
        type: String, 
        required: true,
        unique: true,
        index: true
    },
    expiresAt: { type: Date, },
    userId: {
        type: String,
        required: true, 
        index: true  
    },
    revoked: {
        type: Boolean,
        default: false
    }
}, {
    virtuals: true,
    timestamps: true,
    strict: true,
    collection: 'tokens'
});

export const TokenModel = model<TokenDocument>('Token', TokenSchema);