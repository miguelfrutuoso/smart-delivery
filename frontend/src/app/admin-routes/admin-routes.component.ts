import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { Route } from '../models/route';
import { Warehouse } from '../models/warehouse'

import { RouteService } from '../services/route/route.service';
import { WarehouseService } from '../services/warehouse/warehouse.service'

@Component({
	selector: 'app-admin-routes',
	templateUrl: './admin-routes.component.html',
	styleUrls: ['./admin-routes.component.css']
})
export class AdminRoutesComponent implements OnInit {

	constructor(private routeService: RouteService, private warehouseService: WarehouseService) { }

	minDate: NgbDate;
	maxDate: NgbDate;
	routes: Route[];
	warehouses: Warehouse[];
	warehouse: number;

	orderby: { value: number, name: string }[] = [
		{ value: 0, name: "Route ID" },
		{ value: 1, name: "date (oldest-newest)" },
		{ value: 2, name: "date (newest-oldest)" },
	]

	filterby: { value: number, name: string }[] = [
		{ value: 0, name: "Date" },
		{ value: 1, name: "Warehouse" },
	]

	orderbyvalue: number;
	filterbyvalue: number;

	ngOnInit(): void {
		this.getRoutes();
		this.getWarehouses();
	}

	getRoutes() {
		this.routeService.getRoutes().subscribe(routes => this.routes = routes)
	}

	getWarehouses() {
		this.warehouseService.getWarehouses().subscribe(warehouses => this.warehouses = warehouses)
	}

	getFilteredRoutes() {
		if (this.minDate && this.maxDate && this.orderbyvalue) {
			this.routeService.getFilteredRoutes(this.minDate, this.maxDate, this.orderbyvalue)
				.subscribe(routes => this.routes = routes)
		}
		if (this.warehouse){
			this.routeService.getFilteredRoutesByWarehouse(2)
				.subscribe(routes => this.routes = routes)
		}
	}

	
}
