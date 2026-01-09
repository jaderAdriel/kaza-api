import { TokenRepository } from "@/repositories/TokenRepository";
import { TokenDocument, TokenModel } from "../models/TokenModel";
import { Token, TokenEntity } from "@/domain/entities/TokenEntity";
import { PersistanceError } from "@/errors/PersistanceError";

export class MongoTokenRepository implements TokenRepository {
    public async save(token: TokenEntity): Promise<TokenEntity> {
        const tokenDoc: TokenDocument | null = await TokenModel.create(this.toPersistance(token));

        if (!tokenDoc) {
            throw new PersistanceError("Failed to persist token for userId=" + token.userId);
        }

        return this.toEntity(tokenDoc);
    }


    public async findByHash(hash: string): Promise<TokenEntity | null> {
        const tokenDoc: TokenDocument | null = await TokenModel.findOne({ hash: hash}).lean();

        if (!tokenDoc) return null;

        return this.toEntity(tokenDoc);
    }

    public async revokeAllToken(userId: string): Promise<number> {
        const res = await TokenModel.updateMany(
            {userId: userId, revoked: false},
            {$set: {revoked: true}}
        );

        return res.modifiedCount;
    }

    public async revokeToken(token: TokenEntity): Promise<void> {
        const res = await TokenModel.updateOne(
            {hash: token.hash, revoked: false},
            {$set: {revoked: true}}
        );

        if (res.matchedCount === 0) {
            throw new PersistanceError("Token don't exists to be revoked" + token.userId);
        }
    }

    private toPersistance(entity: TokenEntity): Token {
        return {
            hash: entity.hash,
            userId: entity.userId,
            revoked: entity.revoked,
            createdAt: entity.createdAt,
            expiresAt: entity.expiresAt
        }
    }

    private toEntity(doc: TokenDocument): TokenEntity {
        return TokenEntity.make({
            hash: doc.hash,
            userId: doc.userId,
            revoked: doc.revoked,
            createdAt: doc.createdAt,
            expiresAt: doc.expiresAt
        })
    }
}