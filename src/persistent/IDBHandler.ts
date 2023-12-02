export default interface IDBHandler<T> {
    getAll(): Promise<T[]>;
    getByFilter(filter: any): Promise<T[]>;
    insert(target: T): Promise<void>;
    update(target: T): Promise<void>;
    save(target: T): Promise<void>;
    remove(target: T): Promise<void>;
}