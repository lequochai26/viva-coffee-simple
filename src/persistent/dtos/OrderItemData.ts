export interface OrderItemData {
    order: string;
    item: string;
    amount: number;
    totalPrice: number
}

export const orderItemDataPattern: OrderItemData = {
    order: "",
    item: "",
    amount: 0,
    totalPrice: 0
}