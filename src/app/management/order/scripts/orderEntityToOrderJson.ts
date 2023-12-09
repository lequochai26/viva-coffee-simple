import Order from "@/domain/entities/Order";
import { OrderItemJSON, OrderJSON } from "../aliases/jsonAliases";

export function orderEntityToOrderJson(order: Order): OrderJSON {
    const items: OrderItemJSON[] = [];

    for (const orderItem of order.Items) {
        items.push(
            {
                item: orderItem.Item?.Id as string,
                amount: orderItem.Amount as number,
                itemName: orderItem.Item?.Name as string,
                itemPrice: orderItem.Item?.Price as number,
                totalPrice: orderItem.TotalPrice as number
            }
        );
    }

    const result: OrderJSON = {
        id: order.Id as string,
        date: order.Date as Date,
        createdBy: order.CreatedBy?.Username as string,
        createdByFullName: order.CreatedBy?.FullName as string,
        totalPrice: order.TotalPrice as number,
        items: items
    };

    return result;
}