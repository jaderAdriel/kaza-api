import { UserService } from "../../src/services/UserService.js";
import type { UserRepository } from "../../src/repositories/UserRepository.js";
import { describe } from "node:test";


describe("UserService", () => {
    let repoMock: jest.Mocked<UserRepository>;
    let service: UserService;

    beforeEach(() => {
        repoMock = {} as jest.Mocked<UserRepository>;
        service = new UserService(repoMock);
    });
})