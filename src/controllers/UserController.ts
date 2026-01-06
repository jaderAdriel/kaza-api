import type { Request, Response } from "express";
import type { UserService } from "../services/UserService.js";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async getMessage(req: Request, res: Response) {
        const message = this.userService.getMessage();
        
        return res.json(message);
    }
}