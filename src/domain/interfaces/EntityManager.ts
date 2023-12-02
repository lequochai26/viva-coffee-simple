export default interface EntityManager<T> {
    getAll(path: any[]): Promise<T[]>;
    getByFilter(filter: any, path: any[]): Promise<T[]>;
    insert(target: T): Promise<void>;
    update(target: T): Promise<void>;
    save(target: T): Promise<void>;
    remove(target: T): Promise<void>;
}