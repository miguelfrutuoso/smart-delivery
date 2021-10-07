import { Location } from './location'

export class Order {
    id: number;
    customer: number;
    retailer: number;
    date_available: string;
    weight: number;
    ordertimelocation: Location[];
    description: string;
    state: string;

    constructor(customer: number, 
        retailer: number,
        date_available: string,
        weight: number,
        ordertimelocation: Location[],
        description: string,
        state?: string){
            this.customer = customer,
            this.retailer = retailer,
            this.date_available = date_available,
            this.weight = weight,
            this.ordertimelocation = ordertimelocation ,
            this.description = description,
            this.state = state
        }
}