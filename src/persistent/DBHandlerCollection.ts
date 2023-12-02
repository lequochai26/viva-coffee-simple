import IItemDBHandler from "./interfaces/IItemDBHandler";
import IItemTypeDBHandler from "./interfaces/IItemTypeDBHandler";
import IOrderDBHandler from "./interfaces/IOrderDBHandler";
import IUserDBHandler from "./interfaces/IUserDBHandler";
import ItemDBHandler from "./ItemDBHandler";
import ItemTypeDBHandler from "./ItemTypeDBHandler";
import OrderDBHandler from "./OrderDBHandler";
import UserDBHandler from "./UserDBHandler";

// UserDBHandler
export const userDBHandler: IUserDBHandler = new UserDBHandler();
export const itemDBHandler: IItemDBHandler = new ItemDBHandler();
export const itemTypeDBHandler: IItemTypeDBHandler = new ItemTypeDBHandler();
export const orderDBHandler: IOrderDBHandler = new OrderDBHandler();