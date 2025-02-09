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