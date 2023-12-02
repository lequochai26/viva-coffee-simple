import IDBHandler from "./IDBHandler";
import { UserData } from "../dtos/UserData";

export default interface IUserDBHandler extends IDBHandler<UserData> {
    get(username: string): Promise<UserData | undefined>;
}