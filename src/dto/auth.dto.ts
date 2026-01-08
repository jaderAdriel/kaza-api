import z from "zod";


export interface AuthSignInResponseDto {
    accessToken: string,
    refreshToken: string
}

export type SignInResponse = Pick<AuthSignInResponseDto, 'accessToken'>;

export const SignInRequestSchema = z.object({
  email: z.string().nonempty("E-mail inválido"),
  password: z.string().nonempty("Senha inválida"),
});

export type SignInRequestDto = z.infer<typeof SignInRequestSchema>;