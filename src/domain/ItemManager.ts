import { ItemData } from "@/persistent/dtos/ItemData";
import IItemManager from "./interfaces/IItemManager";
import IItemTypeManager from "./interfaces/IItemTypeManager";
import Item from "./entities/Item";
import IOrderItemManager from "./interfaces/IOrderItemManager";
import { itemDBHandler } from "@/persistent/DBHandlerCollection";

class ItemManager implements IItemManager {
    // Fields:
    private itemTypeManager?: IItemTypeManager;
    private orderItemManager?: IOrderItemManager;

    // Construtor:
    public constructor(itemTypeManager?: IItemTypeManager, orderItemManager?: IOrderItemManager) {
        this.itemTypeManager = itemTypeManager;
        this.orderItemManager = orderItemManager;
    }

    // Methods:
    public async getAll(path: any[]): Promise<Item[]> {
        // Getting data
        try {
            var itemsData: ItemData[] = await itemDBHandler.getAll(); 
        }
        catch (error: any) {
            throw error;
        }

        // Converting
        const result: Item[] = await this.multiDataToItem(itemsData, path);

        // Return result
        return result;
    }

    public async getByFilter(filter: any, path: any[]): Promise<Item[]> {
        // Getting data
        try {
            var itemsData: ItemData[] = await itemDBHandler.getByFilter(filter);
        }
        catch (error: any) {
            throw error;
        }

        // Converting
        const result: Item[] = await this.multiDataToItem(itemsData, path);

        // Return result
        return result;
    }

    public async get(id: string, path: any[]): Promise<Item | undefined> {
        // Getting data
        try {
            var itemData: ItemData | undefined = await itemDBHandler.get(id);
        }
        catch (error: any) {
            throw error;
        }

        // Exit if no data found
        if (!itemData) {
            return;
        }

        // Converting
        const item: Item = await this.dataToItem(itemData, path);

        // Return item
        return item;
    }

    public async insert(item: Item): Promise<void> {
        // Converting item to data
        const data: ItemData = this.itemToData(item);

        // Try inserting data
        try {
            return itemDBHandler.insert(data);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async update(item: Item): Promise<void> {
        // Converting item to data
        const data: ItemData = this.itemToData(item);

        // Try updating data
        try {
            return itemDBHandler.update(data);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async save(item: Item): Promise<void> {
        try {
            if (!await itemDBHandler.get(item.Id as string)) {
                return this.insert(item);
            }
            else {
                return this.update(item);
            }
        }
        catch (error: any) {
            throw error;
        }
    }

    public async remove(item: Item): Promise<void> {
        // Converting item to data
        const data: ItemData = this.itemToData(item);

        // Try removing
        try {
            return itemDBHandler.remove(data);
        }
        catch (error: any) {
            throw error;
        }
    }

    // Operations:
    private async dataToItem(data: ItemData, path: any[]): Promise<Item> {
        // Self definition:
        const self: ItemManager = this;

        // Local functions:
        function precheck(id: string, path: any[]): Item | undefined {
            for (const obj of path) {
                if (obj instanceof Item) {
                    if (obj.Id === id) {
                        return obj;
                    }
                }
            }
        }

        async function typeHandling(type: string, item: Item, path: any[]): Promise<void> {
            try {
                if (self.itemTypeManager) {
                    item.Type = await self.itemTypeManager.get(type);
                }
            }
            catch (error: any) {
                throw error;
            }
        }

        async function ordersHandling(item: Item, path: any): Promise<void> {
            try {
                if (self.orderItemManager) {
                    item.Orders = await self.orderItemManager.getByFilter({ item: item.Id }, path);
                }
            }
            catch (error: any) {
                throw error;
            }
        }

        // Executions:
        // Item declaration
        let item: Item | undefined;

        // Path prechecking
        item = precheck(data.id, path);

        // Return if found in path
        if (item) {
            return item;
        }

        // If item not found in path, try converting it
        item = new Item();

        // Fields copying
        item.Id = data.id;
        item.Name = data.name;
        item.Price = data.price;
        
        // Dependencies handling
        if (data.type) {
            await typeHandling(data.type, item, path);
        }

        await ordersHandling(item, path);

        // Return item
        return item;
    }

    private async multiDataToItem(data: ItemData[], path: any[]): Promise<Item[]> {
        // Result initializaton
        const result: Item[] = [];

        // Converting
        for (const itemData of data) {
            result.push(await this.dataToItem(itemData, path));
        }

        // Return result
        return result;
    }

    private itemToData(item: Item): ItemData {
        return {
            id: item.Id as string,
            name: item.Name as string,
            price: item.Price as number,
            type: (item.Type ? item.Type.Id : undefined)
        };
    }

    // Getters / setters:
    public get ItemTypeManager(): IItemTypeManager | undefined {
        return this.itemTypeManager;
    }

    public set ItemTypeManager(itemTypeManager: IItemTypeManager | undefined) {
        this.itemTypeManager = itemTypeManager;
    }

    public get OrderItemManager(): IOrderItemManager | undefined {
        return this.orderItemManager;
    }

    public set OrderItemManager(orderItemManager: IOrderItemManager | undefined) {
        this.orderItemManager = orderItemManager;
    }
}

export default ItemManager;