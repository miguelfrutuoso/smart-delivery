import { Component, OnInit } from '@angular/core';
import { RouteService } from '../services/route/route.service'
import { Route } from '../models/route'
import { OrderService } from '../services/order/order.service';
import { Order } from '../models/order';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

	constructor(private routeService: RouteService, private orderService: OrderService) { }

	routes: Route[];
	orders: Order[];

	ngOnInit(): void {
		this.getRoutes()
		this.getOrders()
	}

	getRoutes() {
		this.routeService.getNLastRoutes(10).subscribe(routes => this.routes = routes)
	}

	getOrders() {
		this.orderService.getNLastOrders(10).subscribe(orders => this.orders = orders)
	}
}
