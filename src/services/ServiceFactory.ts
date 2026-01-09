
import { MongoUserRepository } from "@/infrastructure/database/mongodb/repositories/MongoUserRepository";
import { HashService } from "./HashService";
import { UserService } from "./UserService";
import { AuthService } from "./AuthService";
import { TokenService } from "./TokenService";
import { MongoTokenRepository } from "@/infrastructure/database/mongodb/repositories/MongoTokenRepository";

export class ServiceFactory {
    private readonly userRepository = new MongoUserRepository();
    private readonly tokenRepository = new MongoTokenRepository();
    private hashService: HashService | undefined;
    private userService: UserService | undefined;
    private authService: AuthService | undefined;
    private tokenService: TokenService | undefined;

    public getHashService() : HashService {
        if (this.hashService === undefined) {
            this.hashService = new HashService();
        }

        return this.hashService;
    }

    public getUserService() : UserService {
        if (this.userService === undefined) {
            this.userService = new UserService(this.userRepository, this.getHashService());
        }

        return this.userService;
    }

    public getTokenService() : TokenService {
        if (this.tokenService === undefined) {
            this.tokenService = new TokenService(
                process.env.JWT_SECRET_KEY ?? 'gLzIskLIuMl/uBq9yHbIIODoRn+9WDiw1/8mrO+nTeQ',
                this.tokenRepository
            );
        }

        return this.tokenService;
    }

    public getAuthService() : AuthService {
        if (this.authService === undefined) {
            this.authService = new AuthService(
                this.userRepository, 
                this.getHashService(),
                this.getTokenService()
            );
        }

        return this.authService;
    }
}