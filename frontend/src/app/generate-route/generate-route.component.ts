import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { Warehouse } from '../models/warehouse'
import { Order } from '../models/order'
import { WarehouseService } from '../services/warehouse/warehouse.service'
import { OrderService } from '../services/order/order.service'

@Component({
	selector: 'app-generate-route',
	templateUrl: './generate-route.component.html',
	styleUrls: ['./generate-route.component.css']
})
export class GenerateRouteComponent implements OnInit {

	constructor(private warehouseService: WarehouseService,
				private orderService: OrderService) { }

	deliveryDate: NgbDate;

	warehouses: Warehouse[];
	selectedWarehouse: number;
	radius: number;

	orders: Order[];

	ngOnInit(): void {
		this.getWarehouses()
	}

	async getWarehouses() {
		await this.warehouseService.getWarehouses().subscribe(warehouses => this.warehouses = warehouses)
	}

	getOrders() {
		console.log(this.selectedWarehouse)
		this.orderService.getOrdersByRangeTime(this.radius, this.selectedWarehouse, this.deliveryDate)
		.subscribe(orders => this.orders = orders)
		console.log(this.orders)
	}
}
