import IItemDBHandler from "./IItemDBHandler";
import IItemTypeDBHandler from "./IItemTypeDBHandler";
import IUserDBHandler from "./IUserDBHandler";
import ItemDBHandler from "./ItemDBHandler";
import ItemTypeDBHandler from "./ItemTypeDBHandler";
import UserDBHandler from "./UserDBHandler";

// UserDBHandler
export const userDBHandler: IUserDBHandler = new UserDBHandler();
export const itemDBHandler: IItemDBHandler = new ItemDBHandler();
export const itemTypeDBHandler: IItemTypeDBHandler = new ItemTypeDBHandler();