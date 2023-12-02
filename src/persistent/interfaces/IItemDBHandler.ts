import IDBHandler from "./IDBHandler";
import { ItemData } from "../dtos/ItemData";

export default interface IItemDBHandler extends IDBHandler<ItemData> {
    get(id: string): Promise<ItemData | undefined>;
}