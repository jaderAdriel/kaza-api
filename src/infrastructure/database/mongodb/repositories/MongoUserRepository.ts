import { UserEntity } from "@/domain/entities/User";
import { UserRepository } from "@/repositories/UserRepository";
import { UserDocument, UserModel } from "../models/UserModel";

export class MongoUserRepository implements UserRepository {
    public async findAll(): Promise<UserEntity[]> {
        const usersDoc: UserDocument[] = await UserModel.find().lean();

        return usersDoc.map((userDoc) => this.userDocToEntity(userDoc))
    }

    public async get(id: string): Promise<UserEntity | null> {
        const userDoc: UserDocument | null = await UserModel.findById(id).lean();

        if (userDoc === null) return null;

        return this.userDocToEntity(userDoc);
    }

    public async save(user: UserEntity): Promise<UserEntity> {
        const newUser: UserDocument = await UserModel.create(this.toPersistance(user));

        return UserEntity.make(newUser);
    }

    public async delete(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id);
    }

    private toPersistance(entity: UserEntity) {
        return {
            ...(entity.id && { _id: entity.id }),
            name: entity.getName(),
            email: entity.getEmail(),
            hashedPassword: entity.getHashedPassword(),
        }
    }

    private userDocToEntity(doc: UserDocument): UserEntity {
        return UserEntity.make({
            id: doc._id.toJSON(),
            name: doc.name,
            email: doc.email,
            hashedPassword: doc.hashedPassword
        })
    }
}