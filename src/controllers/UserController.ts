import type { Request, Response } from "express";
import type { UserService } from "../services/UserService.js";
import { CreateUserDto, UserResponseDto } from "@/dto/user.dto.js";
import { RequestWU } from "@/types/Request.js";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async findAll(req: RequestWU, res: Response) : Promise<Response<UserResponseDto[]>> {
        const users = await this.userService.findAll();

        return res.status(200).json({
            users: users,
            user: req.userId
        });
    }

    public async get(req: RequestWU, res: Response, id: string) : Promise<Response<UserResponseDto[]>> {
        const users = await this.userService.get(id);

        return res.status(200).json(users);
    }

    public async create(req: Request, res: Response) : Promise<Response<UserResponseDto[]>> {
        const dto = req.body as CreateUserDto;
        
        const users = await this.userService.save(dto);

        return res.status(201).json(users);
    }

    public async delete(req: RequestWU, res: Response, id: string) : Promise<Response<void>> {
        const user = this.userService.get(req.userId);

        return res.status(204).send();
    }
}