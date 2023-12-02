import OrderItem from "../entities/OrderItem";
import EntityManager from "./EntityManager";

export default interface IOrderItemManager extends EntityManager<OrderItem> {
    get(order: string, item: string, path: any[]): Promise<OrderItem | undefined>;
}