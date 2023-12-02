import IItemDBHandler from "./IItemDBHandler";
import IUserDBHandler from "./IUserDBHandler";
import ItemDBHandler from "./ItemDBHandler";
import UserDBHandler from "./UserDBHandler";

// UserDBHandler
export const userDBHandler: IUserDBHandler = new UserDBHandler();
export const itemDBHandler: IItemDBHandler = new ItemDBHandler();