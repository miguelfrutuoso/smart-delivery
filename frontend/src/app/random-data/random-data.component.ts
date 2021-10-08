import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { LOCATIONS } from '../random-locations'
import { OrderService } from '../services/order/order.service'
import { Order } from '../models/order'
import { Location } from '../models/location'
import { timing } from '../models/timing'
import { Time } from '@angular/common';
import { min } from 'rxjs/operators';
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';

@Component({
	selector: 'app-random-data',
	templateUrl: './random-data.component.html',
	styleUrls: ['./random-data.component.css']
})
export class RandomDataComponent implements OnInit {

	constructor(private orderService: OrderService) { }

	ngOnInit(): void {
	}

	dataDay: NgbDate;
	orderNumber: number;

	createRandomOrders() {
		var locations: { longitude: number, latitude: number }[] = this.shuffle(LOCATIONS)

		for (var i = 0; i < this.orderNumber; i++) {

			var locationsNumber = Math.floor(Math.random() * 3) + 1;

			var randLocations: Array<Location> = new Array(locationsNumber);
			var order: Order;

			for (var j = 0; j < locationsNumber; j++) {


				var timingNumber = Math.floor(Math.random() * 3) + 1; //number of timeIntervals for each Location
				var t: Time = { hours: 7, minutes: 0 };

				var times: Array<timing> = new Array(timingNumber)

				for (var c = 0; c < timingNumber; c++) {

					var startTiming: Time;
					if (c == 0)
						startTiming = this.randomTimeGenerator(t, 15)
					else
						startTiming = this.randomTimeGenerator(t, 20)

					t.hours = startTiming.hours + Math.floor(Math.random() * 5) + 1;
					
					if (t.hours >= 20 || startTiming.hours >= 20){
						times = times.slice(0, c)					
						break;
					} 
						

					times[c] = new timing(this.datetimeToString(this.dataDay, startTiming), this.datetimeToString(this.dataDay, t))
	
				}
				i++;
				
				randLocations[j] = new Location(locations[i].latitude, locations[i].longitude, times)
			}
			
			// order = new Order(
			// 	1, // TODO RANDOM in users
			// 	2,
			// 	this.dateToString(this.dataDay),
			// 	Math.floor(Math.random() * 10) + 1,
			// 	randLocations,
			// 	"Random order"
			// )
			// console.log(order)
			// this.orderService.addOrder(order).subscribe()
		}

	}

	datetimeToString(date: NgbDate, time: Time) {
		return (date.year + '-' + date.month + '-' + date.day + ' ' + time.hours + ':' + time.minutes)
	}

	dateToString(date: NgbDate,) {
		return (date.year + '-' + date.month + '-' + date.day)
	}

	randomTimeGenerator(minTime: Time, maxTime: number) {
		var t: Time = {
			hours: Math.floor(Math.random() * (maxTime - minTime.hours + 1)) + minTime.hours,
			minutes: Math.floor(Math.random() * 60)
		};
		return t
	}

	shuffle(array) {
		var i = array.length, j = 0, temp;
		while (i--) {
			j = Math.floor(Math.random() * (i + 1));
			// swap randomly chosen element with current element
			temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
}


