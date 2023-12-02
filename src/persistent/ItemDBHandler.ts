import { get, getAll, getByFilter, insert, remove, update } from "./DBHandler";
import IItemDBHandler from "./IItemDBHandler";
import { ItemData, itemDataPattern } from "./dtos/ItemData";

// Collection info:
const collectionName: string = "Item";

// Pattern definition:
const pattern: ItemData = itemDataPattern;

// Class definition
class ItemDBHandler implements IItemDBHandler {
    // Constructor:
    public constructor() {

    }

    // Methods:
    public async getAll(): Promise<ItemData[]> {
        try {
            return getAll(collectionName, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async getByFilter(filter: any): Promise<ItemData[]> {
        try {
            return getByFilter(collectionName, filter, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async get(id: string): Promise<ItemData | undefined> {
        try {
            return get(collectionName, { id: id }, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async insert(target: ItemData): Promise<void> {
        try {
            return insert(collectionName, target);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async update(target: ItemData): Promise<void> {
        try {
            return update(collectionName, target, { id: target.id });
        }
        catch (error: any) {
            throw error;
        }
    }

    public async save(target: ItemData): Promise<void> {
        try {
            if (!await get(collectionName, { id: target.id }, pattern)) {
                return this.insert(target);
            }
            else {
                return this.update(target);
            }
        }
        catch (error: any) {
            throw error;
        }
    }

    public async remove(target: ItemData): Promise<void> {
        try {
            return remove(collectionName, { id: target.id });
        }
        catch (error: any) {
            throw error;
        }
    }
}

export default ItemDBHandler;