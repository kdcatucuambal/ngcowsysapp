export interface UserCredentials {
    email: string,
    password: string
}


export interface UserResponse {
    message: string,
    token: string,
    id: number,
    name: string,
    email: string
}

export interface UserRegister {
    email: string,
    password: string,
    cofirmPassword: string,
    name: string,
    lastname: string
}