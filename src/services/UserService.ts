import { UserEntity } from "@/domain/entities/UserEntity.js";
import type { UserRepository } from "../repositories/UserRepository.js";
import { CreateUserDto, UserResponseDto } from "@/dto/user.dto.js";
import { UserMapper } from "@/mapper/UserMapper.js";
import { HashService } from "./HashService.js";

export class UserService {
    private userRepository: UserRepository;
    private hashService: HashService;
    
    constructor (
        userRepository: UserRepository,
        hashService: HashService
    ) {
        this.userRepository = userRepository;
        this.hashService = hashService;
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

        const user = UserEntity.make({
            ...userDto,
            hashedPassword: await this.hashService.hash(userDto.password)
        });

        const newUser = await this.userRepository.save(user);

        return UserMapper.toResponse(newUser);
    }

    public async delete(id: string): Promise<void> {
        return await this.userRepository.delete(id);
    }
}