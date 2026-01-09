import { UserEntity } from "@/domain/entities/UserEntity";

export interface UserRepository {
    findAll(): Promise<UserEntity[]>;
    findOneBy(query: Record<string, any>): Promise<UserEntity | null>;
    get(id: string) : Promise<UserEntity | null>;
    save(user: UserEntity): Promise<UserEntity>;
    delete(id: string): Promise<void>
}