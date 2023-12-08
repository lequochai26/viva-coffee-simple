export interface OrderItem {
    item: string;
    itemName: string;
    itemPrice: number;
    amount: number;
    totalPrice: number;
}

export interface Order {
    id: string;
    date: Date;
    totalPrice: number;
    items: OrderItem[];
    createdBy: string;
    createdByFullName: string;
}