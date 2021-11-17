import { Time } from '@angular/common';
import {Order} from './order'

export class Route {
    id: number;
    orders: Order[];
    day: string;
    warehouse: number;
    start_time: Time;
}