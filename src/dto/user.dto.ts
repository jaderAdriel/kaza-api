export interface UserCreateDto {
    name: string,
    email: string,
    password: string
}

export interface UserResponseDto {
    id: string,
    name: string,
    email: string
}