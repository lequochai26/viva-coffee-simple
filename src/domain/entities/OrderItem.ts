import Item from "./Item";
import Order from "./Order";

export default class OrderItem {
    // Fields:
    private order?: Order;
    private item?: Item;
    private amount?: number;
    private totalPrice?: number;

    // Constructor:
    public constructor(order?: Order, item?: Item, amount?: number, totalPrice?: number) {
        this.order = order;
        this.item = item;
        this.amount = amount;
        this.totalPrice = totalPrice;
    }

    // Behaviours:
    public calculateTotalPrice(): number {
        this.totalPrice = (this.item?.Price as number) * (this.amount as number);
        return this.totalPrice;
    }

    // Getters & setters:
    public get Order(): Order | undefined {
        return this.order;
    }

    public set Order(order: Order | undefined) {
        this.order = order;
    }

    public get Item(): Item | undefined {
        return this.item;
    }

    public set Item(item: Item | undefined) {
        this.item = item;
    }

    public get Amount(): number | undefined {
        return this.amount;
    }

    public set Amount(amount: number | undefined) {
        this.amount = amount;
    }

    public get TotalPrice(): number | undefined {
        return this.totalPrice;
    }

    public set TotalPrice(totalPrice: number | undefined) {
        this.totalPrice = totalPrice;
    }
}