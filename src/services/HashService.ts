import bcrypt from 'bcrypt';

export class HashService {
    private readonly saltRounds = 10;

    public async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);

        return bcrypt.hash(password, salt);
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}