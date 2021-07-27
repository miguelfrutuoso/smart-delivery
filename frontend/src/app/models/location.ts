import {timing} from './timing' 

export class Location{
    latitude: number;
    longitude: number;
    time_interval: timing[];

    constructor(latitude: number, longitude: number, timings: timing[]){
        this.latitude = latitude,
        this.longitude = longitude,
        this.time_interval = timings
    }
}