import {OrderInterface} from "./order.interface";

export interface GetUserInterface {
    blocked: boolean
    company: string;
    confirmed: boolean;
    createdAt: string;
    email: string;
    id: string;
    name: string;
    provider: string;
    surname: string;
    updatedAt: string;
    username: string;
    orders?: OrderInterface[];
}
