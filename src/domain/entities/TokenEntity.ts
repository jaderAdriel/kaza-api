import { DomainValidationError } from "@/errors/DomainError";


export interface TokenProps {
    hash: string;
    expiresAt: Date;
    revoked?: boolean;
    createdAt?: Date;
    userId: string
}

export interface Token {
    hash: string;
    expiresAt: Date;
    revoked: boolean;
    createdAt: Date;
    userId: string
}

export class TokenEntity {
    /**
     * Max time to live in ms: 604800000 =  1 week
     */
    static readonly maxTTL = 604800000;

    public readonly hash: string;
    public readonly expiresAt: Date;
    public readonly revoked: boolean;
    public readonly createdAt: Date;
    public readonly userId: string;

    public static make(props: TokenProps): TokenEntity {
        const createdAt = props?.createdAt ?? new Date();
        const revoked = props.revoked ?? false;

        // Difference in milliseconds
        const timeDifferenceMs = props.expiresAt.getMilliseconds() - createdAt.getMilliseconds();

        if (timeDifferenceMs > this.maxTTL) {
            throw new DomainValidationError("Token have a ttl to long")
        }

        return new TokenEntity({
            ...props,
            createdAt: props?.createdAt ?? new Date(),
            revoked: revoked
        });
    }

    private constructor(props: Token) {
        this.hash = props.hash;
        this.expiresAt = props.expiresAt;
        this.revoked = props.revoked;
        this.createdAt = props.createdAt;
        this.userId = props.userId;
    }

    public isExpired(): boolean {
        const diff = this.expiresAt.getTime() - Date.now();
        return diff <= 0;
    }

    public isValid(): boolean {
        // must neither be expired or revoked
        return !(this.isExpired() || this.revoked);
    }
}