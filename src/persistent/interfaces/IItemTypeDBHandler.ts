import IDBHandler from "./IDBHandler";
import { ItemTypeData } from "../dtos/ItemTypeData";

export default interface IItemTypeDBHandler extends IDBHandler<ItemTypeData> {
    get(id: string): Promise<ItemTypeData | undefined>;
}