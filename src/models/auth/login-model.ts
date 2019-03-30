export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends SessionData{
  token: string;
}

export interface SessionData {
  user: number;
  project: number;
  role: number;
}
