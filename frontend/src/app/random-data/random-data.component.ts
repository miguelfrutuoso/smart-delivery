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

	createRandomOrders(orderNumber: number) {
		var locations: { longitude: number, latitude: number }[] = this.shuffle(LOCATIONS)

		for (var i = 0; i < orderNumber; i++) {

			var locationsNumber = Math.floor(Math.random() * 3) + 1; // number of locations of ith order

			var randLocations: Array<Location> = new Array(locationsNumber); // locations of ith order
			var order: Order;

			for (var j = 0; j < locationsNumber; j++) {


				var t: Time = { hours: 7, minutes: 0 };

				var times: Array<timing> = []

				var startTiming: Time = this.randomTimeGenerator(t, 15)
					
				var shft: Time = {
					hours: startTiming.hours + 1,
					minutes: 0
				}

				var endTiming: Time = this.randomTimeGenerator(shft, 20)

				times.push(new timing(this.datetimeToString(this.dataDay, startTiming), this.datetimeToString(this.dataDay, endTiming)))
				
				randLocations[j] = new Location(locations[i].latitude, locations[i].longitude, times)
				i++;
			}
			
			order = new Order(
			 	1, // TODO RANDOM in users
			 	2,
				this.dateToString(this.dataDay),
			 	Math.floor(Math.random() * 10) + 1,
				randLocations,
				"Random order",
				1
			)
			console.log(order)
			this.orderService.addOrder(order).subscribe()
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


