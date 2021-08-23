import { Time } from '@angular/common';
import {Order} from './order'

export class Route {
    id: number;
    orders: Order[];
    day: Date;
    warehouse: number;
    start_time: Time;
}