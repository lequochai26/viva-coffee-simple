export interface OrderData {
    id: string;
    date: Date;
    totalPrice: number;
    createdBy?: string;
}

export const orderDataPattern: OrderData = {
    id: "",
    date: new Date(),
    totalPrice: 0,
    createdBy: ""
}