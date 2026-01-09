import { Router } from "express";
import { AuthController } from "@/controllers/AuthController";
import { validate } from "@/middlewares/validate.middleware";
import { SignInRequestSchema } from "@/dto/auth.dto"
import { serviceFactory } from "@/app";

const authController = new AuthController(serviceFactory.getAuthService());

const authRoutes = Router();

authRoutes.post('/login', validate(SignInRequestSchema), (req, res) => authController.signIn(req, res));

export { authRoutes };