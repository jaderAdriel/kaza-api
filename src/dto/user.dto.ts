import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().nonempty("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export interface UserResponseDto {
    id: string,
    name: string,
    email: string
}