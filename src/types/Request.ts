import { UserEntity } from '@/domain/entities/UserEntity'
import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

/**
 * Request with User
 */
export interface RequestWU extends Request {
    userId: string;
}

export interface TokenPayload extends JwtPayload {
    name: string;
}