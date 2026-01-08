import { JwtPayload, sign } from 'jsonwebtoken'


export class TokenService {
    private secret: string;
    
    constructor (secret: string ) {
        this.secret = secret;
    }

    public generateAccessToken(payload: JwtPayload): string {
        return sign(
            { ...payload, type: "access"}, 
            this.secret, 
            { expiresIn: '15m' }
        );
    }

    public generateRefreshToken(): string {
        return crypto.randomUUID();
    }
}