import Item from "../entities/Item";
import EntityManager from "./EntityManager";

export default interface IItemManager extends EntityManager<Item> {
    get(id: string): Promise<Item | undefined>;
}