import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Route } from '../../models/route'
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

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

	dateToStringWithZeros(date: NgbDate){
		var zero = ""
		var day_zero = ""
		if (date.month < 10) zero = "0"
		if (date.day < 10) day_zero = "0"
		return (date.year + '-' + zero + date.month + '-' + date.day + day_zero)  		
	}
}
