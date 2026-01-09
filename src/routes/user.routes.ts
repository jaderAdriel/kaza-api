import { UserController } from "@/controllers/UserController.js";
import { Request, Response, Router } from "express";
import { validate } from "@/middlewares/validate.middleware";
import { CreateUserSchema } from "@/dto/user.dto";
import { isLogged } from "@/middlewares/auth.middleware";
import { serviceFactory } from "@/app";

const userController = new UserController(serviceFactory.getUserService());

const userRoutes = Router();

userRoutes.get('/', 
    isLogged, 
    (req, res) => userController.findAll(req, res)
);

userRoutes.get('/:id', 
    isLogged,
    (req: Request<{id: string}>, res: Response) => {
        userController.get(req, res, req.params.id);
    }
);

userRoutes.post('/', 
    validate(CreateUserSchema), 
    (req, res) => userController.create(req, res)
);

userRoutes.delete('/:id', 
    isLogged, 
    (req: Request<{id: string}>, res: Response) => {
        userController.delete(req, res, req.params.id);
    }
);

export { userRoutes };