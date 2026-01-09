import { UserResponseDto as User } from '@/dto/user.dto'

declare global {
  namespace Express {
    interface Request {
      user?: User; // ou o que você precisar
    }
  }
}
