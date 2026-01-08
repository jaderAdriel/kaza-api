import { Router } from "express";
import { AuthService } from "@/services/AuthService";
import { userRepository, hashService } from "./user.routes";
import { TokenService } from "@/services/TokenService";
import { AuthController } from "@/controllers/AuthController";
import { validate } from "@/middlewares/validate";
import { SignInRequestSchema } from "@/dto/auth.dto"

const tokenService = new TokenService(process.env.JWT_SECRET_KEY ?? 'gLzIskLIuMl/uBq9yHbIIODoRn+9WDiw1/8mrO+nTeQ')
const authService = new AuthService(userRepository, hashService, tokenService);
const authController = new AuthController(authService);

const authRoutes = Router();

authRoutes.post('/login', validate(SignInRequestSchema), (req, res) => authController.signIn(req, res));

export { authRoutes };