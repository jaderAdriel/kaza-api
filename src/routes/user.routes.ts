import { UserService } from "@/services/UserService.js";
import { UserController } from "@/controllers/UserController.js";
import { Router } from "express";
import { MongoUserRepository } from "@/infrastructure/database/mongodb/repositories/MongoUserRepository";
import { validate } from "@/middlewares/validate";
import { CreateUserSchema } from "@/dto/user.dto";

const userRepository = new MongoUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRoutes = Router();

userRoutes.get('/', (req, res) => userController.findAll(req, res));
userRoutes.get('/:id', (req, res) => userController.get(req, res, req.params.id));
userRoutes.post('/', validate(CreateUserSchema), (req, res) => userController.create(req, res));
userRoutes.delete('/:id', (req, res) => userController.delete(req, res, req.params.id));

export { userRoutes };