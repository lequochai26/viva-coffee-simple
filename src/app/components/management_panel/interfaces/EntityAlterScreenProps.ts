export default interface EntityAlterScreenProps<T> {
    target: T;
    onAlter(): void;
    close(): void;
}