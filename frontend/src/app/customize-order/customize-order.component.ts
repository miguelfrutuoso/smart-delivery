import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { OrderService }  from '../services/order/order.service'
import { GetUsersService } from '../services/get-users/get-users.service'

import { Order } from '../models/order'
import { User } from '../models/user'
import { LocationTimePickerComponent } from '../location-time-picker/location-time-picker.component'

@Component({
	selector: 'app-customize-order',
	templateUrl: './customize-order.component.html',
	styleUrls: ['./customize-order.component.css']
})
export class CustomizeOrderComponent implements OnInit {

	constructor(private route: ActivatedRoute,
				private orderService: OrderService,
				private getUsersService: GetUsersService) { }

	@ViewChild(LocationTimePickerComponent)
	
	private locationTimePickerComponent: LocationTimePickerComponent;
	id: number;
	order: Order;
	retailer: User;

	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			this.id = params['id'];
		});
		this.getOrder().then(() => this.getRetailerInfo())
		
	}

	async getOrder(){
		await this.orderService.getOrder(this.id)
			.subscribe(order => this.order = order,
				() => console.log("error"),
				() => this.getRetailerInfo())
	}

	async getRetailerInfo() {
		await this.getUsersService.getUserDetail(this.order.retailer)
			.subscribe(retailer => this.retailer = retailer)
	}

	async updateOrder() {
		this.order.ordertimelocation = this.locationTimePickerComponent.locations
		//console.log(this.order.ordertimelocation)
		await this.orderService.updateOrder(this.id, this.order)
		 	.subscribe()	
	}

}
