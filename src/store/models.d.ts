export interface UserAuth {
    email: string;
    password: string;
}

export interface RegisterResponse {
    id: string;
    email: string;
}


export interface LoginResponse {
    email: string;
    name: string;
    value: string;
    expires: string;
}

export interface Token {
    token: string;
    expires: string;
}