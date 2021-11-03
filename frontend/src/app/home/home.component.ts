import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order'
import { OrderService }  from '../services/order/order.service'
import { AuthService } from '../services/auth/auth.service'
import { User } from '../models/user';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private orderService: OrderService, private authService: AuthService) { }

	orders: Order[];
	recievedOrders: Order[];
	distributionOrders: Order[];
	loggedUser: User;

	ngOnInit(): void {
		this.getOrders()
		this.getRecievedOrders()
		this.authService.getUserLogged().subscribe(
			user => this.loggedUser = user
		)
	}

	async getOrders() {
		await this.orderService.getOrders(1) // TODO mudar para user logged
			.subscribe(orders => this.orders = orders)
		
	}

	async getRecievedOrders() {
		await this.orderService.getUserRecievedOrders()
			.subscribe(orders => this.recievedOrders = orders)
	}

	async getDistributionOrders() {
		await this.orderService.getUserDistributionOrders()
			.subscribe(orders => this.distributionOrders = orders)
	}
}	
