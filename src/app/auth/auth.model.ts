export interface Role {
    id: number;
    name: string;
}

export interface User {
    token: string;
    username: string;
    roles: Role[]
}

export interface Login {
    username: string;
    password: string;
}

export interface DetailUser {
    username: string;
    email: string;
    roles: Role[]
}