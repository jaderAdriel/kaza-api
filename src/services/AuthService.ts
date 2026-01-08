import type { UserRepository } from "../repositories/UserRepository.js";
import { HashService } from "./HashService.js";
import { sign } from 'jsonwebtoken'
import { TokenService } from "./TokenService.js";
import { AuthSignInResponseDto, SignInRequestDto, SignInResponse } from "@/dto/auth.dto.js";

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
            user_id: foundedUser.id
        });

        const refreshToken = this.tokenService.generateRefreshToken();

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }

    }
}