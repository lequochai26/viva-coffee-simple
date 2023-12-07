import User from "@/app/interfaces/User";

export default interface EntityAlterScreenProps<T> {
    user?: User;
    target?: T;
    onAlter(): void;
    close(): void;
}