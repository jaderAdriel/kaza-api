import { User } from "@/domain/entities/User.js";
import type { UserRepository } from "../repositories/UserRepository.js";
import { CreateUserDto, UserResponseDto } from "@/dto/user.dto.js";
import { UserMapper } from "@/mapper/UserMapper.js";

export class UserService {
    private userRepository: UserRepository;

    constructor (userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.findAll();

        return UserMapper.toResponseList(users);
    }

    public async get(id: string): Promise<UserResponseDto> {
        const user = await this.userRepository.get(id);

        if (!user) {
            throw new Error("User don't exists");
        }

        return UserMapper.toResponse(user);
    }

    public async save(userDto: CreateUserDto): Promise<UserResponseDto> {
        
        const user = UserMapper.toEntity(userDto);

        const newUser = await this.userRepository.save(user);

        return UserMapper.toResponse(newUser);
    }

    public async delete(id: string): Promise<void> {
        return await this.userRepository.delete(id);
    }
}