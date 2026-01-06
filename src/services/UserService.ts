import type { UserRepository } from "../repositories/UserRepository.js";

export class UserService {
    private userRepository: UserRepository;

    constructor (userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public getMessage(): string {
        return "Hello World";
    }
}