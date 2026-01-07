import { User } from "@/domain/entities/User";
import { CreateUserDto, UserResponseDto } from "@/dto/user.dto";

export class UserMapper {

    static toResponse(user: User): UserResponseDto {
        if (user.id == null) {
            throw new Error("Invalid user: user without id");
        }
        
        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }

    static toResponseList(users: User[]): UserResponseDto[] {
        return users.map(user => this.toResponse(user));
    }

    static toEntity(userDto: CreateUserDto) : User {
        return {
            id: null,
            name: userDto.name,
            email: userDto.email,
        }
    }
}