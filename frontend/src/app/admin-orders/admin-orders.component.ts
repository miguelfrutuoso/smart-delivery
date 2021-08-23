import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../models/order';
import { OrderService } from '../services/order/order.service';

@Component({
	selector: 'app-admin-orders',
	templateUrl: './admin-orders.component.html',
	styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

	constructor(private orderService: OrderService) { }

	orders: Order[];

	minDate: NgbDate;
	maxDate: NgbDate;
	orderby: { value: number, name: string }[] = [
		{ value: 0, name: "Order ID" },
		{ value: 1, name: "date (oldest-newest)" },
		{ value: 2, name: "date (newest-oldest)" },
	]

	orderbyvalue: number;

	ngOnInit(): void {
		this.getOrders();
	}

	getOrders() {
		this.orderService.getNLastOrders(10).subscribe(orders => this.orders = orders)
	}

	getFilteredOrders() {
		if (this.minDate && this.maxDate && this.orderbyvalue){
			this.orderService.getFilteredOrders(this.minDate, this.maxDate, this.orderbyvalue)
			.subscribe(orders => this.orders = orders)
		}
	}

}
