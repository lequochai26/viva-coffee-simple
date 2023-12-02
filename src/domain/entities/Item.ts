import ItemType from "./ItemType";
import OrderItem from "./OrderItem";

export default class Item {
    // Fields:
    private id?: string;
    private name?: string;
    private price?: number;
    private orders: OrderItem[];
    private type?: ItemType;

    // Constructor:
    public constructor(id?: string, name?: string, price?: number, orders?: OrderItem[], type?: ItemType) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.orders = (orders || []);
        this.type = type;
    }

    // Getters & setters:
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

    public get Price(): number | undefined {
        return this.price;
    }

    public set Price(price: number | undefined) {
        this.price = price;
    }

    public get Orders(): OrderItem[] {
        return this.orders;
    }

    public set Orders(orders: OrderItem[]) {
        this.orders = orders;
    }

    public get Type(): ItemType | undefined {
        return this.type;
    }

    public set Type(type: ItemType | undefined) {
        this.type = type;
    }
}