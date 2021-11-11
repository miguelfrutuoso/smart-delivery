import {timing} from './timing' 
import { Address } from '../models/address'

export class Location{
    latitude: number;
    longitude: number;
    time_interval: timing[];
    selected: boolean;
    place_name: string;
    nth_order: number;
    addressString: Address;

    constructor(longitude?: number, latitude?: number, timings?: timing[], selected?: boolean, place_name?: string, nth_order?: number, addressString?: Address){
        this.latitude = latitude,
        this.longitude = longitude,
        this.time_interval = timings,
        this.selected = selected,
        this.place_name = place_name,
        this.nth_order = nth_order,
        this.addressString = addressString
    }
}