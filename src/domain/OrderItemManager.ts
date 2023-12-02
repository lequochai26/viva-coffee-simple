import { OrderItemData } from "@/persistent/dtos/OrderItemData";
import IItemManager from "./interfaces/IItemManager";
import IOrderItemManager from "./interfaces/IOrderItemManager";
import IOrderManager from "./interfaces/IOrderManager";
import OrderItem from "./entities/OrderItem";
import { orderItemDBHandler } from "@/persistent/DBHandlerCollection";

class OrderItemManager implements IOrderItemManager {
    // Fields:
    private itemManager?: IItemManager;
    private orderManager?: IOrderManager;

    // Constructor:
    public constructor(itemManager?: IItemManager, orderManager?: IOrderManager) {
        this.itemManager = itemManager;
        this.orderManager = orderManager;
    }

    // Methods:
    public async getAll(path: any[]): Promise<OrderItem[]> {
        // Getting data
        try {
            var data: OrderItemData[] = await orderItemDBHandler.getAll();
        }
        catch (error: any) {
            throw error;
        }

        // Try converting
        try {
            var result: OrderItem[] = await this.multiDataToOrderItem(data, path);
        }
        catch (error: any) {
            throw error;
        }

        // Return result
        return result;
    }

    public async getByFilter(filter: any, path: any[]): Promise<OrderItem[]> {
        // Getting data
        try {
            var data: OrderItemData[] = await orderItemDBHandler.getByFilter(filter);
        }
        catch (error: any) {
            throw error;
        }

        // Try converting
        try {
            var result: OrderItem[] = await this.multiDataToOrderItem(data, path);
        }
        catch (error: any) {
            throw error;
        }

        // Return result
        return result;
    }

    public async get(order: string, item: string, path: any[]): Promise<OrderItem | undefined> {
        // Getting data
        try {
            var data: OrderItemData | undefined = await orderItemDBHandler.get(order, item);
        }
        catch (error: any) {
            throw error;
        }

        // Exit if no data found
        if (!data) {
            return;
        }

        // Try converting
        try {
            var orderItem: OrderItem = await this.dataToOrderItem(data, path);
        }
        catch (error: any) {
            throw error;
        }

        // Return order item
        return orderItem;
    }
    
    public async insert(entity: OrderItem): Promise<void> {
        // Converting to data
        const data: OrderItemData = this.orderItemToData(entity);

        // Try inserting data
        try {
            return orderItemDBHandler.insert(data);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async update(entity: OrderItem): Promise<void> {
        // Converting to data
        const data: OrderItemData = this.orderItemToData(entity);

        // Try updating data
        try {
            return orderItemDBHandler.update(data);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async save(entity: OrderItem): Promise<void> {
        try {
            if (!await orderItemDBHandler.get(entity.Order?.Id as string, entity.Item?.Id as string)) {
                return this.insert(entity);
            }
            else {
                return this.update(entity);
            }
        }
        catch (error: any) {
            throw error;
        }
    }

    public async remove(entity: OrderItem): Promise<void> {
        // Converting to data
        const data: OrderItemData = this.orderItemToData(entity);

        // Try removing data
        try {
            return orderItemDBHandler.remove(data);
        }
        catch (error: any) {
            throw error;
        }
    }

    // Operations:
    private async dataToOrderItem(data: OrderItemData, path: any[]): Promise<OrderItem> {
        // Self definition
        const self: OrderItemManager = this;

        // Local functions:
        function precheck(order: string, item: string, path: any[]): OrderItem | undefined {
            for (const obj of path) {
                if (obj instanceof OrderItem) {
                    if (obj.Order?.Id === order && obj.Item?.Id === item) {
                        return obj;
                    }
                }
            }
        }

        async function orderHandling(orderItem: OrderItem, id: string, path: any[]): Promise<void> {
            try {
                if (self.orderManager) {
                    orderItem.Order = await self.orderManager.get(id, path);
                }
            }
            catch (error: any) {
                throw error;
            }
        }

        async function itemHandling(orderItem: OrderItem, id: string, path: any[]): Promise<void> {
            try {
                if (self.itemManager) {
                    orderItem.Item = await self.itemManager.get(id, path);
                }
            }
            catch (error: any) {
                throw error;
            }
        }

        // Execution:
        // Order item declaration
        let orderItem: OrderItem | undefined;

        // Path prechecking
        orderItem = precheck(data.order, data.item, path);

        // Exit and return entity if order item found in path
        if (orderItem) {
            return orderItem;
        }

        // Start converting if order item not found in path
        orderItem = new OrderItem();
        orderItem.Amount = data.amount;
        orderItem.TotalPrice = data.totalPrice;

        // Path pushing
        path.push(orderItem);

        // Dependencies handling
        try {
            await orderHandling(orderItem, data.order, path);
            await itemHandling(orderItem, data.item, path);
        }
        catch (error: any) {
            throw error;
        }

        // Return order item
        return orderItem;
    }

    private async multiDataToOrderItem(data: OrderItemData[], path: any[]): Promise<OrderItem[]> {
        // Result initialization
        const result: OrderItem[] = [];

        // Try converting
        try {
            for (const orderItemData of data) {
                result.push(await this.dataToOrderItem(orderItemData, path));
            }
        }
        catch (error: any) {
            throw error;
        }

        // Return result
        return result;
    }

    private orderItemToData(orderItem: OrderItem): OrderItemData {
        return {
            item: orderItem.Item?.Id as string,
            order: orderItem.Order?.Id as string,
            amount: orderItem.Amount as number,
            totalPrice: orderItem.TotalPrice as number
        };
    }

    // Getters and setters
    public get ItemManager(): IItemManager | undefined {
        return this.itemManager;
    }

    public set ItemManager(itemManager: IItemManager | undefined) {
        this.itemManager = itemManager;
    }

    public get OrderManager(): IOrderManager | undefined {
        return this.orderManager;
    }

    public set OrderManager(orderManager: IOrderManager | undefined) {
        this.orderManager = orderManager;
    }
}

export default OrderItemManager;