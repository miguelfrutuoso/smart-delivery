import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Route } from '../../models/route'
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/models/order';
import { Time } from '@angular/common';
import { User } from 'src/app/models/user';

@Injectable({
	providedIn: 'root'
})
export class RouteService {

	readonly URL = environment.apiUrl + "route/"

	constructor(private http: HttpClient) { }

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		}),
		observe: 'response' as 'body'
	};

	getRoutes(): Observable<Route[]> {
		return this.http.get<Route[]>(this.URL)
			.pipe(
				tap(_ => console.log("Service called"))
			)
	}

	getRoute(id: number): Observable<Route> {
		return this.http.get<Route>(this.URL + id)
			.pipe(
				tap(_ => console.log("Service called"))
			)
	}

	getNonAssignedRoutes() : Observable<Route[]> {
		return this.http.get<Route[]>(this.URL + 'notassigned/')
	}

	createRoute(route: Route): Observable<Route>{

		class Routes {
			id: number;
			orders: number[];
			day: string;
			warehouse: number;
			start_time: Time;

			constructor(id: number, orders: number[], day: string, warehouse: number, start_time: Time ){
				this.id = id,
				this.orders = orders,
				this.day = day,
				this.warehouse = warehouse,
				this.start_time = start_time
			}
		}
		
		const routes = new Routes(route.id, route.orders.map(a => a.id), route.day, route.warehouse, route.start_time)

		return this.http.post<Route>(this.URL + 'create/', routes)
		.pipe(
			tap(_ => console.log("Service called"))
		)
	}

	assignRoute(driver: number, route: number): Observable<Route> {
		return this.http.put<Route>(this.URL + 'assign/' + route + '/' + driver, this.httpOptions)
	}

	getNLastRoutes(n: number): Observable<Route[]> {
		return this.http.get<Route[]>(this.URL + 'lastroutes/' + n)
	}

	getFilteredRoutes(date_min: NgbDate, date_max: NgbDate, by: number): Observable<Route[]> {
		return this.http.get<Route[]>(this.URL + 'filter/' + 
		this.dateToStringWithZeros(date_min) + '/' + 
		this.dateToStringWithZeros(date_max) + '/' + 
		by)
	}

	getFilteredRoutesByWarehouse(warehouse: number): Observable<Route[]> {
		return this.http.get<Route[]>(this.URL + 'filter/warehouse/' + warehouse)
	}

	getTodayDriverRoute(driver: User): Observable<Route[]> {
		return this.http.get<Route[]>(this.URL + 'todayroute/' + driver.id)
	}

	getPastDriverRoute(driver: User): Observable<Route[]> {
		return this.http.get<Route[]>(this.URL + 'pastroutes/' + driver.id)
	}
	
	getNextDriverRoute(driver: User): Observable<Route[]> {
		return this.http.get<Route[]>(this.URL + 'nextroutes/' + driver.id)
	}

	dateToStringWithZeros(date: NgbDate){
		var zero = ""
		var day_zero = ""
		if (date.month < 10) zero = "0"
		if (date.day < 10) day_zero = "0"
		return (date.year + '-' + zero + date.month + '-' + date.day + day_zero)  		
	}
}
