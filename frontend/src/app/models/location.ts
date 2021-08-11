import {timing} from './timing' 

export class Location{
    latitude: number;
    longitude: number;
    time_interval: timing[];
    selected: boolean;

    constructor(longitude?: number, latitude?: number, timings?: timing[], selected?: boolean){
        this.latitude = latitude,
        this.longitude = longitude,
        this.time_interval = timings
        this.selected = selected
    }
}