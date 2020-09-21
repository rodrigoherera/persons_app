export interface UserAuth {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  error: string;
}

export interface LoginResponse {
  email: string;
  name: string;
  value: string;
  expires: string;
  error: string;
}

export interface Token {
  token: string;
  expires: string;
}
