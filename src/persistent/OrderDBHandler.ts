import { get, getAll, getByFilter, insert, remove, update } from "./DBHandler";
import IOrderDBHandler from "./interfaces/IOrderDBHandler";
import { OrderData, orderDataPattern } from "./dtos/OrderData";

// Collection info:
const collectionName: string = "Order";

// Patter definition
const pattern: OrderData = orderDataPattern;

// Class definition
class OrderDBHandler implements IOrderDBHandler {
    // Constructor:
    public constructor() {

    }

    // Methods:
    public async getAll(): Promise<OrderData[]> {
        try {
            return getAll(collectionName, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async getByFilter(filter: any): Promise<OrderData[]> {
        try {
            return getByFilter(collectionName, filter, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async get(id: string): Promise<OrderData | undefined> {
        try {
            return get(collectionName, { id: id }, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async insert(target: OrderData): Promise<void> {
        try {
            return insert(collectionName, target);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async update(target: OrderData): Promise<void> {
        try {
            return update(collectionName, target, { id: target.id });
        }
        catch (error: any) {
            throw error;
        }
    }

    public async save(target: OrderData): Promise<void> {
        try {
            if (!await this.get(target.id)) {
                this.insert(target);
            }
            else {
                this.update(target);
            }
        }
        catch (error: any) {
            throw error;
        }
    }

    public async remove(target: OrderData): Promise<void> {
        try {
            remove(collectionName, { id: target.id });
        }
        catch (error: any) {
            throw error;
        }
    }
}

export default OrderDBHandler;