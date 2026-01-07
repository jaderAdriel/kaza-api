import { DomainValidationError } from "@/errors/DomainError";


export interface UserProps {
    id?: string,
    hashedPassword: string,
    name: string,
    email: string
}

export class UserEntity {
    public readonly id: string | undefined;
    private name: string;
    private email: string;
    private hashedPassword: string;

    public static make(props: UserProps): UserEntity {
        if (props.name === '') {
            throw new DomainValidationError("User cannot have blank name");
        }

        if (props.email === '') {
            throw new DomainValidationError("Email cannot have blank name");
        }

        return new UserEntity(props);
    }

    private constructor(props: UserProps) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.hashedPassword = props.hashedPassword;
    }

    public update (name: string, email: string) {
        if (name === '') {
            throw new DomainValidationError("User cannot have blank name");
        }

        if (email === '') {
            throw new DomainValidationError("Email cannot have blank name");
        }

        this.name = name;
        this.email = email;
    }

    public getName() {
        return this.name;
    }

    public getEmail() {
        return this.email;
    }

    public getHashedPassword() {
        return this.hashedPassword;
    }
}