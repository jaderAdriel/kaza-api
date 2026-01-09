import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { TokenRepository } from '@/repositories/TokenRepository';
import { TokenEntity } from '@/domain/entities/TokenEntity';
import { TokenPayload } from '@/dto/auth.dto';

export class TokenService {
    private secret: string;
    private tokenRepository: TokenRepository;
    
    constructor (secret: string, tokenRepository: TokenRepository ) {
        this.secret = secret;
        this.tokenRepository = tokenRepository;
    }

    public generateAccessToken(payload: JwtPayload): string {
        return sign(
            { ...payload, type: "access"}, 
            this.secret, 
            { expiresIn: '15m' }
        );
    }

    public verify(token: string): TokenPayload | false {
        try {
            const decoded = verify(token, this.secret);

            if (typeof decoded === 'string') {
                return false;
            }

            return decoded as TokenPayload;
            
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            return false;
        }
    }

    public generateRefreshToken(userId: string): TokenEntity {
        const now = new Date();
        const hash = crypto.randomUUID();

        return TokenEntity.make({
            expiresAt: new Date(now.getTime() + TokenEntity.maxTTL),
            hash: hash,
            userId: userId
        })
    }

    public async save(token: TokenEntity): Promise<TokenEntity> {
        const newToken = await this.tokenRepository.save(token);

        return newToken;
    }

    public async revokeAllTokens(userId: string): Promise<void> {
        this.tokenRepository.revokeAllToken(userId);
    }

    public async revokeToken(token: TokenEntity): Promise<void> {
        this.tokenRepository.revokeAllToken(token.hash);
    }

    public async findByHash(hash: string) {
        return this.tokenRepository.findByHash(hash);
    } 
}