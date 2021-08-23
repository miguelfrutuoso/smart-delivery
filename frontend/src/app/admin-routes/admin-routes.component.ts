import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Route } from '../models/route';
import { RouteService } from '../services/route/route.service';

@Component({
  selector: 'app-admin-routes',
  templateUrl: './admin-routes.component.html',
  styleUrls: ['./admin-routes.component.css']
})
export class AdminRoutesComponent implements OnInit {

  constructor(private routeService: RouteService) { }

  minDate: NgbDate;
  maxDate: NgbDate;
  routes: Route[];

  orderby: { value: number, name: string }[] = [
		{ value: 0, name: "Route ID" },
		{ value: 1, name: "date (oldest-newest)" },
		{ value: 2, name: "date (newest-oldest)" },
	]

	orderbyvalue: number;

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes(){
    this.routeService.getRoutes().subscribe(routes => this.routes = routes)
  }

  getFilteredRoutes() {
		if (this.minDate && this.maxDate && this.orderbyvalue){
			this.routeService.getFilteredRoutes(this.minDate, this.maxDate, this.orderbyvalue)
			.subscribe(routes => this.routes = routes)
		}
	}
}
