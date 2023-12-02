import Item from "./Item";

export default class ItemType {
    // Fields:
    private id?: string;
    private name?: string;
    private items: Item[];

    // Constructor:
    public constructor(id?: string, name?: string, items?: Item[]) {
        this.id = id;
        this.name = name;
        this.items = (items || []);
    }

    // Getters and setters
    public get Id(): string | undefined {
        return this.id;
    }

    public set Id(id: string | undefined) {
        this.id = id;
    }

    public get Name(): string | undefined {
        return this.name;
    }

    public set Name(name: string | undefined) {
        this.name = name;
    }

    public get Items(): Item[] {
        return this.items;
    }

    public set Items(items: Item[]) {
        this.items = items;
    }
}