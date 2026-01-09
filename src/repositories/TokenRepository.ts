import { TokenEntity } from "@/domain/entities/TokenEntity";

export interface TokenRepository {
    save(token: TokenEntity): Promise<TokenEntity>;
    
    findByHash(hash: string): Promise<TokenEntity | null>;

    /**
     * Revokes all token for the user.
     * Returns the number of modified entities.
    */ 
    revokeAllToken(userId: string): Promise<number>;

    /**
     * Revokes an active token.
    */
    revokeToken(token: TokenEntity): Promise<void>;
}