import { OrderData } from "@/persistent/dtos/OrderData";
import IOrderItemManager from "./interfaces/IOrderItemManager";
import IOrderManager from "./interfaces/IOrderManager";
import IUserManager from "./interfaces/IUserManager";
import Order from "./entities/Order";
import User from "./entities/User";
import { orderDBHandler } from "@/persistent/DBHandlerCollection";

class OrderManager implements IOrderManager {
    // Fields:
    private userManager?: IUserManager;
    private orderItemManager?: IOrderItemManager;

    // Constructor:
    public constructor(userManager?: IUserManager, orderItemManager?: IOrderItemManager) {
        this.userManager = userManager;
        this.orderItemManager = orderItemManager;
    }

    // Methods:
    public async getAll(path: any[]): Promise<Order[]> {
        // Getting data
        try {
            var ordersData: OrderData[] = await orderDBHandler.getAll();
        }
        catch (error: any) {
            throw error;
        }

        // Converting
        try {
            var result: Order[] = await this.multiDataToOrder(ordersData, path);
        }
        catch (error: any) {
            throw error;
        }

        // Return result
        return result;
    }

    public async getByFilter(filter: any, path: any[]): Promise<Order[]> {
        // Getting data
        try {
            var ordersData: OrderData[] = await orderDBHandler.getByFilter(filter);
        }
        catch (error: any) {
            throw error;
        }

        // Try converting
        try {
            var result: Order[] = await this.multiDataToOrder(ordersData, path);
        }
        catch (error: any) {
            throw error;
        }

        // Return result
        return result;
    }

    public async get(id: string, path: any[]): Promise<Order | undefined> {
        // Getting data
        try {
            var orderData: OrderData | undefined = await orderDBHandler.get(id);
        }
        catch (error: any) {
            throw error;
        }

        // Exit if no data found
        if (!orderData) {
            return;
        }

        // Try converting
        try {
            var order: Order = await this.dataToOrder(orderData, path);
        }
        catch (error: any) {
            throw error;
        }

        // Return order
        return order;
    }

    public async insert(order: Order): Promise<void> {
        // Converting to data
        const data: OrderData = this.orderToData(order);

        // Try inserting data
        try {
            return orderDBHandler.insert(data);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async update(order: Order): Promise<void> {
        // Converting to data
        const data: OrderData = this.orderToData(order);

        // Try updating data
        try {
            return orderDBHandler.update(data);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async save(order: Order): Promise<void> {
        try {
            if (!await orderDBHandler.get(order.Id as string)) {
                return this.insert(order);
            }
            else {
                this.update(order);
            }
        }
        catch (error: any) {
            throw error;
        }
    }

    public async remove(order: Order): Promise<void> {
        // Converting to data
        const data: OrderData = this.orderToData(order);

        // Try removing data
        try {
            return orderDBHandler.remove(data);
        }
        catch (error: any) {
            throw error;
        }
    }

    // Operations:
    private async dataToOrder(data: OrderData, path: any[]): Promise<Order> {
        // Self definition
        const self: OrderManager = this;
        
        // Local functions:
        function precheck(id: string, path: any): Order | undefined {
            for (const obj of path) {
                if (obj instanceof Order) {
                    if (obj.Id === id) {
                        return obj;
                    }
                }
            }
        }

        async function createdByHandling(order: Order, username: string, path: any[]): Promise<void> {
            try {
                if (self.userManager) {
                    order.CreatedBy = await self.userManager.get(username, path);
                }
            }
            catch (error: any) {
                throw error;
            }
        }

        async function itemsHandling(order: Order, path: any): Promise<void> {
            try {
                if (self.orderItemManager) {
                    order.Items = await self.orderItemManager.getByFilter({ order: order.Id }, path);
                }
            }
            catch (error: any) {
                throw error;
            }
        }

        // Execution:
        // Order declaration
        let order: Order | undefined;

        // Path prechecking
        order = precheck(data.id, path);

        // Exit and return order if found in path
        if (order) {
            return order;
        }

        // If order not found in path, start converting
        order = new Order();

        // Fields copying
        order.Id = data.id;
        order.Date = data.date,
        order.TotalPrice = data.totalPrice;

        // Path pushing
        path.push(order);

        // Dependencies handling
        try {
            if (data.createdBy) {
                await createdByHandling(order, data.createdBy, path);
            }

            await itemsHandling(order, path);
        }
        catch (error: any) {
            throw error;
        }

        // Return order
        return order;
    }

    private async multiDataToOrder(data: OrderData[], path: any[]): Promise<Order[]> {
        // Result initialization
        const result: Order[] = [];

        // Try converting
        try {
            for (const orderData of data) {
                result.push(await this.dataToOrder(orderData, path));
            }
        }
        catch (error: any) {
            throw error;
        }

        // Return result
        return result;
    }

    private orderToData(order: Order): OrderData {
        return {
            id: order.Id as string,
            date: order.Date as Date,
            totalPrice: order.TotalPrice as number,
            createdBy: order.CreatedBy?.Username
        };
    }

    // Getters and setters:
    public get UserManager(): IUserManager | undefined {
        return this.userManager;
    }

    public set UserManager(userManager: IUserManager | undefined) {
        this.userManager = userManager;
    }

    public get OrderItemManager(): IOrderItemManager | undefined {
        return this.orderItemManager;
    }

    public set OrderItemManager(orderItemManager: IOrderItemManager | undefined) {
        this.orderItemManager = orderItemManager;
    }
}

export default OrderManager;