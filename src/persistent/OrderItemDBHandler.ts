import { get, getAll, getByFilter, insert, remove, update } from "./DBHandler";
import { OrderItemData, orderItemDataPattern } from "./dtos/OrderItemData";
import IOrderItemDBHandler from "./interfaces/IOrderItemDBHandler";

// Collection info:
const collectionName: string = "OrderItem";

// Pattern definition
const pattern: OrderItemData = orderItemDataPattern;

// Class definition
class OrderItemDBHandler implements IOrderItemDBHandler {
    // Constructor:
    public constructor() {

    }

    // Methods:
    public async getAll(): Promise<OrderItemData[]> {
        try {
            return getAll(collectionName, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async getByFilter(filter: any): Promise<OrderItemData[]> {
        try {
            return getByFilter(collectionName, filter, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async get(order: string, item: string): Promise<OrderItemData | undefined> {
        try {
            return get(collectionName, { order: order, item: item }, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async insert(target: OrderItemData): Promise<void> {
        try {
            return insert(collectionName, target);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async update(target: OrderItemData): Promise<void> {
        try {
            return update(collectionName, target, { order: target.order, item: target.item });
        }
        catch (error: any) {
            throw error;
        }
    }

    public async save(target: OrderItemData): Promise<void> {
        try {
            if (!await this.get(target.order, target.item)) {
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

    public async remove(target: OrderItemData): Promise<void> {
        try {
            return remove(collectionName, { order: target.order, item: target.item });
        }
        catch (error: any) {
            throw error;
        }
    }
}

export default OrderItemDBHandler;