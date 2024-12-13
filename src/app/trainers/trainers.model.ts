export interface TrainerResponse {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    gender: string,
    phoneNumber: string,
    isAvailable: number,
    isActive: number,
}

export interface TrainerInsert {
    username: string,
    firstName: string,
    lastName: string,
    BirthDate: Date,
    gender: string,
    phoneNumber: string,
    isAvailable: number,
    isActive: number
}

export interface TrainerUpdate {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    gender: string,
    phoneNumber: string,
    isAvailable: number,
    isActive: number
}

export interface GetTrainer {
    message: string,
    status: string,
    data: TrainerResponse
}

export interface User {
    username: string;
    email: string;
    password: string;
}