export interface User {
    id: number;
    username: string;
    role_id: number;
    password: string;
    avatar: string;
    deleted: boolean;
    project_id: number;
}

export interface UserCreateRequest {
    username: string;
    role_id: number;
    password: string;
    avatar: string;
    project_id: number;
}

export interface UserCandidate { // TODO add ProjectLimitedModel implementation
    id: number;
    username: string;
    avatar: string;
}
