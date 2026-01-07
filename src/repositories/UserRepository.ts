import { User } from "@/domain/entities/User";

export interface UserRepository {
    findAll(): Promise<User[]>;
    get(id: string) : Promise<User | null>; 
    save(user: User): Promise<User>;
    delete(id: string): Promise<void>
}