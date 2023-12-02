import Order from "../entities/Order";
import EntityManager from "./EntityManager";

export default interface IOrderManager extends EntityManager<Order> {
    get(id: string): Promise<Order | undefined>;
}