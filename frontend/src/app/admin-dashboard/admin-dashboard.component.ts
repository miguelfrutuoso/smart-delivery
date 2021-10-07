import { Component, OnInit } from '@angular/core';
import { RouteService } from '../services/route/route.service'
import { Route } from '../models/route'
import { OrderService } from '../services/order/order.service';
import { Order } from '../models/order';
import { MatDialog} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

	constructor(private routeService: RouteService, private orderService: OrderService, private dialog: MatDialog) { 
		
	}

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

	forceCustom() {
		this.dialog.open(ForceCustomDialog, {
			width: '50%'
		})
	}
}

@Component({
	selector: 'dialog-elements-example-dialog',
	templateUrl: 'force-custom.html',
	styleUrls: ['./admin-dashboard.component.css']
  })
export class ForceCustomDialog {

	constructor(private dialog: MatDialog, private datePipe: DatePipe, private orderService: OrderService) { 
		this.myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
	}

	forceCustom() {
		this.orderService.forceCustom().subscribe()
	}


	myDate = Date.now().toString();
}