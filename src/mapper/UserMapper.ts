import { UserEntity } from "@/domain/entities/User";
import { UserResponseDto } from "@/dto/user.dto";

export class UserMapper {

    static toResponse(user: UserEntity): UserResponseDto {

        if (user.id == null) {
            throw new Error("Invalid user: user without id");
        }
        
        return {
            id: user.id,
            name: user.getName(),
            email: user.getEmail()
        };
    }

    static toResponseList(users: UserEntity[]): UserResponseDto[] {
        return users.map(user => this.toResponse(user));
    }
}