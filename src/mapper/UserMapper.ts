import { User } from "@/domain/entities/User";
import { UserCreateDto, UserResponseDto } from "@/dto/user.dto";

export class UserMapper {

    static toResponse(user: User): UserResponseDto {
        if (!user.id) {
            throw new Error("User without id");
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

    static toEntity(userDto: UserCreateDto) : User {
        return {
            name: userDto.name,
            email: userDto.email,
        }
    }
}