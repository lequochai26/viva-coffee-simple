export default interface User {
    username: string;
    fullName: string;
    permission: "ADMIN" | "EMPLOYEE";
}