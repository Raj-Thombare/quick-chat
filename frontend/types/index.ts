export type ChatGroupType = {
    id: string
    user_id: number;
    title: string;
    passcode: string;
    created_at: string
}

export type ChatGroupUserType = {
    id: string;
    name: string;
    group_id: string;
    created_at: string;
}

export interface MessageType {
    id: string;
    name: string;
    message: string;
    created_at: string;
    group_id: string;
}