import type { Request, Response } from "express";
import type { AuthService } from "../services/AuthService.js";
import { CreateUserDto, UserResponseDto } from "@/dto/user.dto.js";
import { SignInRequestDto, SignInResponse } from "@/dto/auth.dto.js";

export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public async signIn(req: Request, res: Response) : Promise<Response<SignInResponse>> {

        const signInDto = req.body as SignInRequestDto;

        const response = await this.authService.signIn(signInDto);

        res.cookie('refreshToken', response.refreshToken, {
            httpOnly: true
        })

        return res.status(200).json({
            "accessToken": response.accessToken
        });
    }
}