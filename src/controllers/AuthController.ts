import type { Request, Response } from "express";
import type { AuthService } from "../services/AuthService.js";
import { SignInRequestDto, SignInResponse } from "@/dto/auth.dto.js";

export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public async signIn(req: Request, res: Response) : Promise<Response<SignInResponse>> {

        const signInDto = req.body as SignInRequestDto;

        const { accessToken, refreshToken } = await this.authService.signIn(signInDto);

        res.cookie('refreshToken', refreshToken.hash, {
            httpOnly: true,
            expires: refreshToken.expiresAt
        });

        return res.status(200).json({
            accessToken: accessToken
        });
    }

    public async refresh(req: Request, res: Response) {
        const token = req.cookies?.refreshToken;

        if (!token) {
            res.status(401).json("Token not founded");
        }

        const accessToken = await this.authService.refresh(token);

        return res.status(200).json({
            accessToken: accessToken
        });
    }
}