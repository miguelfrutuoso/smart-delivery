type Gender = 0 | 1 | 2

export class User {
    id: number;
    email: string;
    user_name: string;
    password: string;
    first_name: string;
    last_name: string;
    gender: Gender;
    is_admin: boolean;
    is_retailer: Boolean;
    is_driver: Boolean;
    standart_longitude: number;
    standart_latitude: number;
}