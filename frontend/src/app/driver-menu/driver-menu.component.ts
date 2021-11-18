import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Route } from '../models/route';
import { User } from '../models/user';
import { AuthService } from '../services/auth/auth.service';
import { RouteService } from '../services/route/route.service';

@Component({
	selector: 'app-driver-menu',
	templateUrl: './driver-menu.component.html',
	styleUrls: ['./driver-menu.component.css']
})
export class DriverMenuComponent implements OnInit {

	constructor(private authService: AuthService, private routeService: RouteService) { }

	driver: User;
	todayRoutes: Route[];
	pastRoutes: Route[];
	nextRoutes: Route[];

	rxTime = new Date();
	subscription: Subscription;

	ngOnInit(): void {

		this.authService.getUserLogged().subscribe(
			user => {
				this.driver = user
				this.getDriverRoutes(this.driver)
				this.getPastRoutes(this.driver)
				this.getNextRoutes(this.driver)
			},

		)
		this.subscription = timer(0, 1000)
			.pipe(
				map(() => new Date()),
				share()
			)
			.subscribe(
				time => {
					this.rxTime = time
				}
			)

	}

	getDriverRoutes(driver: User) {
		this.routeService.getTodayDriverRoute(this.driver).subscribe(
			route => this.todayRoutes = route
		)
	}

	getPastRoutes(driver: User) {
		this.routeService.getPastDriverRoute(this.driver).subscribe(
			routes => this.pastRoutes = routes
		)
	}

	getNextRoutes(driver: User) {
		this.routeService.getNextDriverRoute(driver).subscribe(
			routes => this.nextRoutes = routes
		)
	}

}
