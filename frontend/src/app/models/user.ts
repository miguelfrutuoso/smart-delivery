type Gender = 0 | 1 | 2

export class User {
    id: number;
    email: string;
    user_name: string;
    password: string;
    firstname: string;
    lastname: string;
    gender: Gender;
}