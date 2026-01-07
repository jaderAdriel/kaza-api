import { UserEntity } from "@/domain/entities/User";

export interface UserRepository {
    findAll(): Promise<UserEntity[]>;
    get(id: string) : Promise<UserEntity | null>; 
    save(user: UserEntity): Promise<UserEntity>;
    delete(id: string): Promise<void>
}