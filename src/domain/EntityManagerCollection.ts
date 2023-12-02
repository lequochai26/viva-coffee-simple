import ItemManager from "./ItemManager";
import ItemTypeManager from "./ItemTypeManager";
import OrderItemManager from "./OrderItemManager";
import OrderManager from "./OrderManager";
import UserManager from "./UserManager";

export const itemManager: ItemManager = new ItemManager();
export const itemTypeManager: ItemTypeManager = new ItemTypeManager();
export const orderManager: OrderManager = new OrderManager();
export const orderItemManager: OrderItemManager = new OrderItemManager();
export const userManager: UserManager = new UserManager();

itemManager.ItemTypeManager = itemTypeManager;
itemManager.OrderItemManager = orderItemManager;

itemTypeManager.ItemManager = itemManager;

orderManager.OrderItemManager = orderItemManager;
orderManager.UserManager = userManager;

orderItemManager.OrderManager = orderManager;
orderItemManager.ItemManager = itemManager;

userManager.OrderManager = orderManager;