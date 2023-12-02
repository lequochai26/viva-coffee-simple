export interface UserData {
    username: string;
    password: string;
    fullName: string;
    permission: string;
}

export const userDataPattern: UserData = {
    username: "",
    password: "",
    fullName: "",
    permission: ""
}