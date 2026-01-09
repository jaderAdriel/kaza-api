import { TokenEntity } from "@/domain/entities/TokenEntity.js";
import type { UserRepository } from "../repositories/UserRepository.js";
import { HashService } from "./HashService.js";
import { TokenService } from "./TokenService.js";
import { AuthSignInResponseDto, SignInRequestDto } from "@/dto/auth.dto.js";
import { UnauthorizedError } from "@/errors/AppError.js";

export class AuthService {
    private userRepository: UserRepository;
    private hashService: HashService;
    private tokenService: TokenService;
    
    constructor (
        userRepository: UserRepository,
        hashService: HashService,
        tokenService: TokenService
    ) {
        this.userRepository = userRepository;
        this.hashService = hashService;
        this.tokenService = tokenService;
    }

    public async signIn(dto: SignInRequestDto): Promise<AuthSignInResponseDto> {
        const foundedUser = await this.userRepository.findOneBy({email: dto.email});

        if (!foundedUser || foundedUser?.id === undefined) {
            throw new Error(`User with email '${dto.email}' don't exists`);
        }


        const passwordsMatchs = await this.hashService.compare(dto.password, foundedUser.getHashedPassword());

        if (!passwordsMatchs) {
            throw new Error(`Wrong password`);
        }

        const accessToken = this.tokenService.generateAccessToken({ 
            sub: foundedUser.id, 
            name: foundedUser.getName() 
        });

        const refreshToken = this.tokenService.generateRefreshToken(foundedUser.id);

        await this.tokenService.revokeAllTokens(foundedUser.id);
        
        await this.tokenService.save(refreshToken);

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }

    public async refresh(hash: string): Promise<string> {
        const refreshToken = await this.tokenService.findByHash(hash);

        if (refreshToken == null || !refreshToken.isValid()) {
            throw new UnauthorizedError("Invalid token")
        }

        const accessToken = this.tokenService.generateAccessToken({
            user_id: refreshToken.userId
        });

        return accessToken;
    }

    public async signOut(userId: string) {
        this.tokenService.revokeAllTokens(userId);
    }
}