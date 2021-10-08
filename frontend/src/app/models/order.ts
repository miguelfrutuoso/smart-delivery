import { Location } from './location'
import { Warehouse } from './warehouse';

export class Order {
    id: number;
    customer: number;
    retailer: number;
    date_available: string;
    weight: number;
    ordertimelocation: Location[];
    description: string;
    state: string;
    warehouse: number;

    constructor(customer: number, 
        retailer: number,
        date_available: string,
        weight: number,
        ordertimelocation: Location[],
        description: string,
        warehouse: number,
        state?: string,
        ){
            this.customer = customer,
            this.retailer = retailer,
            this.date_available = date_available,
            this.weight = weight,
            this.ordertimelocation = ordertimelocation ,
            this.description = description,
            this.state = state,
            this.warehouse = warehouse
        }
}