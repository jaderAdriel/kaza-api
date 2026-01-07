import type { Request, Response } from "express";
import type { UserService } from "../services/UserService.js";
import { UserCreateDto, UserResponseDto } from "@/dto/user.dto.js";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async findAll(req: Request, res: Response) : Promise<Response<UserResponseDto[]>> {
        const users = await this.userService.findAll();

        return res.json(users).status(200);
    }

    public async get(req: Request, res: Response, id: string) : Promise<Response<UserResponseDto[]>> {
        const users = await this.userService.get(id);

        return res.json(users).status(200);
    }

    public async post(req: Request, res: Response) : Promise<Response<UserResponseDto[]>> {
        const dto: UserCreateDto = req.body;
        
        const users = await this.userService.save(dto);

        return res.json(users).status(201);
    }

    public async delete(req: Request, res: Response, id: string) : Promise<Response<void>> {
        const users = await this.userService.delete(id);

        return res.status(204);
    }
}