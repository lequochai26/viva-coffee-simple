import { OrderItemData } from "../dtos/OrderItemData";
import IDBHandler from "./IDBHandler";

export default interface IOrderItemDBHandler extends IDBHandler<OrderItemData> {
    get(order: string, item: string): Promise<OrderItemData | undefined>;
}