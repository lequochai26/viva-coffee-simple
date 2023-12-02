import IDBHandler from "./IDBHandler";
import { OrderData } from "./dtos/OrderData";

export default interface IOrderDBHandler extends IDBHandler<OrderData> {
    get(id: string): Promise<OrderData | undefined>;
}