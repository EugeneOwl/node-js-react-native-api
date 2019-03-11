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

export interface UserListItem { // TODO use
    id: number;
    username: string;
    role: string;
    avatar: string;
    deleted: boolean;
    project: string;
}
