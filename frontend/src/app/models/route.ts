import { Time } from '@angular/common';
import {Order} from './order'

export class Route {
    orders: Order[];
    day: Date;
    warehouse: number;
    start_time: Time;
}