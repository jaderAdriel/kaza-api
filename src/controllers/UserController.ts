import type { Request, Response } from "express";
import type { UserService } from "../services/UserService.js";
import { CreateUserDto, UserResponseDto } from "@/dto/user.dto.js";
import { UnauthorizedError } from "@/errors/AppError.js";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async findAll(req: Request, res: Response) : Promise<Response<UserResponseDto[]>> {

        if (!req.user) {
            throw new UnauthorizedError();
        }

        const users = await this.userService.findAll();

        return res.status(200).json({
            users: users,
            user: req.user.id
        });
    }

    public async get(req: Request, res: Response, id: string) : Promise<Response<UserResponseDto[]>> {
        if (req.user?.id !== id) {
            throw new UnauthorizedError();
        }
        
        const users = await this.userService.get(id);

        return res.status(200).json(users);
    }

    public async create(req: Request, res: Response) : Promise<Response<UserResponseDto[]>> {
        const dto = req.body as CreateUserDto;
        
        const users = await this.userService.save(dto);

        return res.status(201).json(users);
    }

    public async delete(req: Request, res: Response, id: string) : Promise<Response<void>> {

        if (req.user?.id !== id) {
            throw new UnauthorizedError();
        }

        const user = this.userService.get(id);

        return res.status(204).send();
    }
}