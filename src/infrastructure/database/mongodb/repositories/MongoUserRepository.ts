import { User } from "@/domain/entities/User";
import { UserRepository } from "@/repositories/UserRepository";
import { UserDocument, UserModel } from "../models/UserModel";

export class MongoUserRepository implements UserRepository {
    public async findAll(): Promise<User[]> {
        const usersDoc: UserDocument[] = await UserModel.find().lean();

        usersDoc.map((userDoc) => this.userDocToEntity(userDoc))

        return usersDoc;
    }

    public async get(id: string): Promise<User | null> {
        const userDoc: UserDocument | null = await UserModel.findById(id).lean();

        if (userDoc === null) return null;

        return this.userDocToEntity(userDoc);
    }

    public async save(user: User): Promise<User> {
        const newUser: User = await UserModel.create(user);
        return newUser;
    }

    public async delete(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id);
    }

    private userDocToEntity(userDoc: UserDocument): User {
        return {
            ...userDoc,
            id: userDoc._id.toString()
        }
    }
}