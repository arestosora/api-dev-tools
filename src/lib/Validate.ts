import { User } from "src/interfaces/user";

export function validate(user: User): boolean {
    const { name, email, age } = user;
    return (
        typeof name === 'string' &&
        typeof email === 'string' &&
        email.includes('@') &&
        typeof age === 'number' &&
        age > 0
    );
}