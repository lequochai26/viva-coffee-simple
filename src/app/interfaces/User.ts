export default interface User {
    username: string;
    fullName: string;
    password: string;
    permission: "ADMIN" | "EMPLOYEE";
}