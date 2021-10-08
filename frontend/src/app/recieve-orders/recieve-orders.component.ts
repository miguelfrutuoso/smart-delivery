import { Component, OnInit } from '@angular/core';

import { WarehouseService } from '../services/warehouse/warehouse.service'
import { OrderService } from '../services/order/order.service';

import { Warehouse } from '../models/warehouse'
import { Order } from '../models/order';

@Component({
	selector: 'app-recieve-orders',
	templateUrl: './recieve-orders.component.html',
	styleUrls: ['./recieve-orders.component.css']
})
export class RecieveOrdersComponent implements OnInit {

	constructor(private warehouseService: WarehouseService,
		private orderService: OrderService) { }

	warehouses: Warehouse[];
	selectedWarehouse: number;
	orders: Order[];

	ngOnInit(): void {
		this.getWarehouses()
	}


	getWarehouses() {
		this.warehouseService.getWarehouses().subscribe(
			warehouses => this.warehouses = warehouses
		)
	}

	getOrders() {
		this.orderService.getProcessingOrders(this.selectedWarehouse).subscribe(
			orders => this.orders = orders
		)
	}

	accept(order: Order) {
		this.orderService.acceptOrders(order).subscribe()
		this.orders.forEach((value,index)=>{
			if(value==order) this.orders.splice(index,1);
		});
	}

	reject(order: Order) { //TODO Make rejection
		this.orderService.rejectOrder(order).subscribe()
		this.orders.forEach((value,index)=>{
			if(value==order) this.orders.splice(index,1);
		});
	}

	RemoveElementFromArray(element: number) {
		
	}
}
