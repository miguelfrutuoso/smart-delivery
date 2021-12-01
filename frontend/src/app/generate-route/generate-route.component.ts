import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { Warehouse } from '../models/warehouse'
import { Order } from '../models/order'
import { WarehouseService } from '../services/warehouse/warehouse.service'
import { OrderService } from '../services/order/order.service'
import { RouteService } from '../services/route/route.service';
import { Route } from '../models/route';
import { Time } from '@angular/common';

@Component({
	selector: 'app-generate-route',
	templateUrl: './generate-route.component.html',
	styleUrls: ['./generate-route.component.css']
})
export class GenerateRouteComponent implements OnInit {

	constructor(private warehouseService: WarehouseService,
				private orderService: OrderService,
				private routeService: RouteService) { 
					this.selectedWarehouse = null
				}

	deliveryDate: NgbDate;

	warehouses: Warehouse[];
	selectedWarehouse: number;
	radius: number;

	orders: Order[];
	route: Route;
	startTime: Time;

	ngOnInit(): void {
		this.getWarehouses()
	}

	async getWarehouses() {
		await this.warehouseService.getWarehouses().subscribe(warehouses => this.warehouses = warehouses)
	}

	getOrders() {
		this.orderService.getOrdersByRangeTime(this.radius, this.selectedWarehouse, this.deliveryDate)
		.subscribe(orders => this.orders = orders)
	}

	generateRoute() {
		this.route = new Route()
		this.route.orders = this.orders;
		this.route.day = this.dateToString(this.deliveryDate);
		this.route.start_time = this.startTime;
		this.route.warehouse = this.selectedWarehouse;
		
		this.routeService.createRoute(this.route).subscribe()
	}

	dateToString(date: NgbDate,){
		return (date.year + '-' + date.month + '-' + date.day)
	}
}
