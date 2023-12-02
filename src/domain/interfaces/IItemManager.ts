import Item from "../entities/Item";
import EntityManager from "./EntityManager";

export default interface IItemManager extends EntityManager<Item> {
    get(id: string, path: any[]): Promise<Item | undefined>;
}