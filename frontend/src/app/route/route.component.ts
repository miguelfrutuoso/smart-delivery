import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Order } from '../models/order'
import { Location } from '../models/location'
import { Route } from '../models/route'
import { Address } from '../models/address'

import { RouteService } from '../services/route/route.service'
import { OrderService } from '../services/order/order.service'
import { GeocodingService } from '../services/geocoding/geocoding.service'

@Component({
	selector: 'app-route',
	templateUrl: './route.component.html',
	styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

	constructor(
		private urlroute: ActivatedRoute,
		private routeService: RouteService,
		private orderService: OrderService,
		private geocodingService: GeocodingService) { }

	route: Route;
	id: number;
	orderIDs: number[];
	ordersAddresses: string[] = [];

	ngOnInit(): void {
		this.urlroute.queryParams.subscribe(params => {
			this.id = params['id'];
		});
		this.getRoute()
	}

	async getRoute(){
		await this.routeService.getRoute(this.id)
			.subscribe(route => this.route = route,
				() => this.getOrderDetails(),
				() => this.filterOTL(this.route.orders))
	}

	async getOrderDetails(){
		await this.orderService.getOrdersByIDs(this.route.orders)
		.subscribe(orders => this.route.orders = orders,
			() => console.log(this.route))
	}

	filterOTL(orders: Order[]) {
		for (let order of orders){
			for (let otl of order.ordertimelocation)
				if (otl.selected)
			 		order.ordertimelocation = [otl]
		}
		this.getOrdersAddress(this.route.orders)
	}

	async getOrdersAddress(orders: Order[]){
		for (let order of orders){
			console.log("OLA")
			await this.geocodingService.getAddress(order.ordertimelocation[0].longitude, order.ordertimelocation[0].latitude)
				.subscribe( (data: Address) => this.ordersAddresses.push(data.features[0].place_name))
			}

	}
}
