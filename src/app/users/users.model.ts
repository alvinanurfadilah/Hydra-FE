export interface UserResponse {
    username: string,
    email: string
}

export interface Role {
    id: number,
    name: string
}

export interface UserInsert {
    username: string,
    email: string,
    password: string,
    roles: Role[]
}

export interface UserUpdate {
    username: string,
    email: string,
    password: string,
    roles: Role[]
}

export interface GetUser {
    message: string,
    status: string,
    data: UserResponse
}