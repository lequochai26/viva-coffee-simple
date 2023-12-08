import Order from "@/domain/entities/Order";
import { OrderJSON } from "../aliases/jsonAliases";
import OrderItem from "@/domain/entities/OrderItem";
import IUserManager from "@/domain/interfaces/IUserManager";
import IItemManager from "@/domain/interfaces/IItemManager";

export default async function orderJsonToOrderEntity(target: OrderJSON, id: string, date: Date, userManager: IUserManager, itemManager: IItemManager): Promise<Order> {
    // Path initialization
    const path: any[] = [];

    // Order entitiy iniitialization
    const order: Order = new Order();

    // Fields copying
    order.Id = id;
    order.Date = date;
    order.CreatedBy = await userManager.get(target.createdBy, path);

    for (const orderItemJson of target.items) {
        const orderItem: OrderItem = new OrderItem();

        orderItem.Item = await itemManager.get(orderItemJson.item, path);
        orderItem.Order = order;
        orderItem.Amount = orderItemJson.amount,
        orderItem.calculateTotalPrice();

        order.Items.push(orderItem);
    }

    order.calculateTotalPrice();

    // Return order
    return order;
}