import { UserService } from "@/services/UserService";
import type { UserRepository } from "@/repositories/UserRepository";
import { UserEntity } from "@/domain/entities/UserEntity";
import { HashService } from "@/services/HashService";

describe("UserService", () => {
    let repoMock: jest.Mocked<UserRepository>;
    let service: UserService;

    const mockUser: UserEntity = UserEntity.make({ 
        id: "1", 
        name: "Jeca", 
        email: "jeca@at.com",
        hashedPassword: "testepass"
    }); 

    beforeEach(() => {
        repoMock = {
            findAll: jest.fn(),
            get: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        service = new UserService(repoMock, new HashService());
    });

    describe("findAll", () => {
        it("should return a list of mapped users", async () => {
            repoMock.findAll.mockResolvedValue([mockUser]);

            const result = await service.findAll();

            expect(repoMock.findAll).toHaveBeenCalledTimes(1);
            expect(result).toHaveLength(1);
            expect(result[0]?.email).toBe(mockUser.getEmail());
        });
    });

    describe("get", () => {
        it("should return a user when the ID exists", async () => {
            repoMock.get.mockResolvedValue(mockUser);

            const result = await service.get("1");

            expect(repoMock.get).toHaveBeenCalledWith("1");
            expect(result.id).toBe("1");
        });

        it("should throw an error when the user does not exist", async () => {
            repoMock.get.mockResolvedValue(null);

            await expect(service.get("invalid-id"))
                .rejects
                .toThrow("User don't exists");
        });
    });

    describe("save", () => {
        it("should save a new user and return the response DTO", async () => {
            const createDto = { name: "Jeca", email: "jeca@at.com", password: "testepass" };
            repoMock.save.mockResolvedValue(mockUser);

            const result = await service.save(createDto);

            expect(repoMock.save).toHaveBeenCalled();
            expect(result.id).toBeDefined();
        });
    });

    describe("delete", () => {
        it("should call the repository delete method with the correct id", async () => {
            repoMock.delete.mockResolvedValue(undefined);

            await service.delete("1");

            expect(repoMock.delete).toHaveBeenCalledWith("1");
        });
    });
});