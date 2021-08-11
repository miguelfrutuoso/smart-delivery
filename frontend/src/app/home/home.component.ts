import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order'
import { OrderService }  from '../services/order/order.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private orderService: OrderService) { }

	orders: Order[]

	ngOnInit(): void {
		this.getOrders()
	}

	async getOrders() {
		await this.orderService.getOrders(1) // TODO mudar para user logged
			.subscribe(orders => this.orders = orders)
		
	}
}	
