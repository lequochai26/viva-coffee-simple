import OrderItem from "./OrderItem";

export default class Order {
    // Fields:
    private id?: string;
    private date?: Date;
    private totalPrice?: number;
    private items: OrderItem[];

    // Constructor:
    public constructor(id?: string, date?: Date, totalPrice?: number, items?: OrderItem[]) {
        this.id = id;
        this.date = date;
        this.totalPrice = totalPrice;
        this.items = (items || []);
    }
    
    // Getters & setters
    public get Id(): string | undefined {
        return this.id;
    }

    public set Id(id: string | undefined) {
        this.id = id;
    }

    public get Date(): Date | undefined {
        return this.date;
    }

    public set Date(date: Date | undefined) {
        this.date = date;
    }

    public get TotalPrice(): number | undefined {
        return this.totalPrice;
    }

    public set TotalPrice(totalPrice: number | undefined) {
        this.totalPrice = totalPrice;
    }

    public get Items(): OrderItem[] {
        return this.items;
    }

    public set Items(items: OrderItem[]) {
        this.items = items;
    }
}