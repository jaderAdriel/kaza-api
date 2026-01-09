import { UserEntity } from '@/domain/entities/UserEntity'
import { Request } from 'express'

/**
 * Request with User
 */
export interface RequestWU extends Request {
    user?: UserEntity
}