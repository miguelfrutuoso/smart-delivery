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

	orders: Order[]
	loggedUser: User;

	ngOnInit(): void {
		this.getOrders()
		this.authService.getUserLogged().subscribe(
			user => this.loggedUser = user
		)
	}

	async getOrders() {
		await this.orderService.getOrders(this.loggedUser.id) // TODO mudar para user logged
			.subscribe(orders => this.orders = orders)
		
	}
}	
