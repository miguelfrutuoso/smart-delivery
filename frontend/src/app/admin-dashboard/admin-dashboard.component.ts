import { Component, OnInit } from '@angular/core';
import { RouteService } from '../services/route/route.service'
import { Route } from '../models/route'

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

	constructor(private routeService: RouteService) { }

	routes: Route[];

	ngOnInit(): void {
		this.getRoutes()
	}

	getRoutes() {
		this.routeService.getRoutes().subscribe(routes => this.routes = routes)
	}

}
