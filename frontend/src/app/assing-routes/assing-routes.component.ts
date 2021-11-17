import { Component, OnInit } from '@angular/core';
import { Route } from '../models/route';
import { Warehouse } from '../models/warehouse';
import { RouteService } from '../services/route/route.service';
import { WarehouseService } from '../services/warehouse/warehouse.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GetUsersService } from '../services/get-users/get-users.service';
import { User } from '../models/user';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-assing-routes',
	templateUrl: './assing-routes.component.html',
	styleUrls: ['./assing-routes.component.css']
})
export class AssingRoutesComponent implements OnInit {

	constructor(private warehouseService: WarehouseService, private routeService: RouteService, private dialog: MatDialog, private userService: GetUsersService) { }

	warehouses: Warehouse[];
	routes: Route[];
	drivers: User[];
	
	ngOnInit(): void {
		this.getWarehouses()
		this.getRoutes()
		this.getDrivers()
	}

	getWarehouses() {
		this.warehouseService.getWarehouses().subscribe(
			warehouses => this.warehouses = warehouses
		)
	}

	getWarehouseName(id: Number) {	
		return this.warehouses.filter( value => value.id == id)[0].name
	}

	getRoutes() {
		this.routeService.getNonAssignedRoutes().subscribe(
			routes => this.routes = routes
		)
	}

	getDrivers() {
		this.userService.getDrivers().subscribe(
			drivers => this.drivers = drivers
		)
	}

	assignRoute(route: Route, drivers: User[]) {
		const routeId = route.id
		let dialog = this.dialog.open(AssignRouteDialog, {
			width: '50%',
			data: {
				routeId,
				drivers
			}
		})
		dialog.afterClosed().subscribe(result => {
			const index = this.routes.indexOf(route);
			if (result)
				this.routes.splice(index, 1)
		})
	}

	
}

@Component({
	selector: 'assign-route-dialog',
	templateUrl: 'assign-route.html',
	styleUrls: ['./assing-routes.component.css']
  })
export class AssignRouteDialog {

	constructor(
		private dialog: MatDialog, 
		@Inject(MAT_DIALOG_DATA) public data: any, 
		private routeService: RouteService,
		public dialogRef: MatDialogRef<AssignRouteDialog>) { 
		
	}

	test: number;
	drivers: User[]
	selectedDriver: number;

	ngOnInit() {
		this.drivers = this.data.drivers
		this.test = this.data.routeId
	}

	closeDialog(action: boolean) {
		this.dialogRef.close(action)
	}

	assign(driver: number, route: number) {
		this.routeService.assignRoute(driver, route).subscribe()
		this.closeDialog(true)
	}
}