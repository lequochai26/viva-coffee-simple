import ItemType from "../entities/ItemType";
import EntityManager from "./EntityManager";

export default interface IItemTypeManager extends EntityManager<ItemType> {
    get(id: string): Promise<ItemType | undefined>;
}