import { get, getAll, getByFilter, insert, remove, update } from "./DBHandler";
import IItemTypeDBHandler from "./IItemTypeDBHandler";
import { ItemTypeData, itemTypeDataPattern } from "./dtos/ItemTypeData";

// Collection info:
const collectionName: string = "ItemType";

// Pattern definition
const pattern: ItemTypeData = itemTypeDataPattern;

// Class definition
class ItemTypeDBHandler implements IItemTypeDBHandler {
    // Constructor:
    public constructor() {

    }

    // Methods:
    public async getAll(): Promise<ItemTypeData[]> {
        try {
            return getAll(collectionName, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async getByFilter(filter: any): Promise<ItemTypeData[]> {
        try {
            return getByFilter(collectionName, filter, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async get(id: string): Promise<ItemTypeData | undefined> {
        try {
            return get(collectionName, { id: id }, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async insert(target: ItemTypeData): Promise<void> {
        try {
            return insert(collectionName, target);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async update(target: ItemTypeData): Promise<void> {
        try {
            return update(collectionName, target, { id: target.id });
        }
        catch (error: any) {
            throw error;
        }
    }

    public async save(target: ItemTypeData): Promise<void> {
        try {
            if (!await this.get(target.id)) {
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

    public async remove(target: ItemTypeData): Promise<void> {
        try {
            return remove(collectionName, { id: target.id });
        }
        catch (error: any) {
            throw error;
        }
    }
}

export default ItemTypeDBHandler;