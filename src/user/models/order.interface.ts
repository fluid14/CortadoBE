export interface OrderInterface {
    id: number;
    payment: string;
    stripeSessionId: string;
    createdAt: string;
    updatedAt: string;
    info: string;
    price: number;
    startDate: string;
}
