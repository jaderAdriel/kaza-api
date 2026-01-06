import { UserRepository, UserRepositoryImpl } from "../repositories/UserRepository.js";
import { UserService } from "../services/UserService.js";
import { UserController } from "../controllers/UserController.js";
import { Router } from "express";

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository);
const userController = new UserController(userService); 

const userRoutes = Router();

userRoutes.get('/', (req, res) => userController.getMessage(req, res));

export { userRoutes };