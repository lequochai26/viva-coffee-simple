import { ItemTypeData } from "@/persistent/dtos/ItemTypeData";
import IItemManager from "./interfaces/IItemManager";
import IItemTypeManager from "./interfaces/IItemTypeManager";
import ItemType from "./entities/ItemType";
import { itemTypeDBHandler } from "@/persistent/DBHandlerCollection";

class ItemTypeManager implements IItemTypeManager {
    // Fields:
    private itemManager?: IItemManager;

    // Constructor:
    public constructor(itemManager?: IItemManager) {
        this.itemManager = itemManager;
    }

    // Methods:
    public async getAll(path: any[]): Promise<ItemType[]> {
        // Getting data
        try {
            var itemTypesData: ItemTypeData[] = await itemTypeDBHandler.getAll();
        }
        catch (error: any) {
            throw error;
        }

        // Converting
        const result: ItemType[] = await this.multiDataToItemType(itemTypesData, path);

        // Return result
        return result;
    }

    public async getByFilter(filter: any, path: any[]): Promise<ItemType[]> {
        // Getting data
        try {
            var itemTypesData: ItemTypeData[] = await itemTypeDBHandler.getByFilter(filter);
        }
        catch (error: any) {
            throw error;
        }

        // Converting
        const result: ItemType[] = await this.multiDataToItemType(itemTypesData, path);

        // Return result
        return result;
    }

    public async get(id: string, path: any[]): Promise<ItemType | undefined> {
        // Getting data
        try {
            var itemTypeData: ItemTypeData | undefined = await itemTypeDBHandler.get(id);
        }
        catch (error: any) {
            throw error;
        }

        // Exit if no data found
        if (!itemTypeData) {
            return;
        }

        // Converting
        const itemType: ItemType = await this.dataToItemType(itemTypeData, path);

        // Return item type
        return itemType;
    }

    public async insert(itemType: ItemType): Promise<void> {
        // Converting item type to data
        const itemTypeData: ItemTypeData = this.itemTypeToData(itemType);

        // Try inserting
        try {
            return itemTypeDBHandler.insert(itemTypeData);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async update(itemType: ItemType): Promise<void> {
        // Converting item type to data
        const itemTypeData: ItemTypeData = this.itemTypeToData(itemType);

        // Try updating
        try {
            return itemTypeDBHandler.update(itemTypeData);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async save(itemType: ItemType): Promise<void> {
        try {
            if (!await itemTypeDBHandler.get(itemType.Id as string)) {
                return this.insert(itemType);
            }
            else {
                return this.update(itemType);
            }
        }
        catch (error: any) {
            throw error;
        }
    }

    public async remove(itemType: ItemType): Promise<void> {
        // Converting item type to data
        const itemTypeData: ItemTypeData = this.itemTypeToData(itemType);

        // Try removing
        try {
            return itemTypeDBHandler.remove(itemTypeData);
        }
        catch (error: any) {
            throw error;
        }
    }

    // Operations:
    private async dataToItemType(data: ItemTypeData, path: any[]): Promise<ItemType> {
        // Self definition
        const self: ItemTypeManager = this;

        // Local functions:
        function precheck(id: string, path: any[]): ItemType | undefined {
            for (const obj of path) {
                if (obj instanceof ItemType) {
                    if (obj.Id === id) {
                        return obj;
                    }
                }
            }
        }

        async function itemsHandling(itemType: ItemType, path: any[]): Promise<void> {
            try {
                if (self.itemManager) {
                    itemType.Items = await self.itemManager.getByFilter({ type: itemType.Id as string }, path);
                }
            }
            catch (error: any) {
                throw error;
            }
        }

        // Execution:
        // Item type declaration
        let itemType: ItemType | undefined;

        // Path prechecking
        itemType = precheck(data.id, path);

        // Return if itemType found in path
        if (itemType) {
            return itemType;
        }

        // Start converting if itemType not found in path
        itemType = new ItemType();

        // Fields copying
        itemType.Id = data.id;
        itemType.Name = data.name;

        // Dependencies handling
        await itemsHandling(itemType, path);

        // Return itemType
        return itemType;
    }

    private async multiDataToItemType(data: ItemTypeData[], path: any[]): Promise<ItemType[]> {
        // Result initialization
        const result: ItemType[] = [];

        // Converting
        for (const itemTypeData of data) {
            result.push(await this.dataToItemType(itemTypeData, path));
        }

        // Return result
        return result;
    }

    private itemTypeToData(itemType: ItemType): ItemTypeData {
        return {
            id: itemType.Id as string,
            name: itemType.Name as string
        };
    }

    // Getters and setters:
    public get ItemManager(): IItemManager | undefined {
        return this.itemManager;
    }

    public set ItemManager(itemManager: IItemManager | undefined) {
        this.itemManager = itemManager;
    }
}

export default ItemTypeManager;