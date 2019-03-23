export interface UserListItem {
    id: number;
    username: string;
    avatar: string;
    tasksToPerform: number;
    tasksInProgress: number;
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
