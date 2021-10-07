import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order } from '../../models/order'
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
	providedIn: 'root'
})
export class OrderService {

	readonly URL = environment.apiUrl + "order/"

	constructor(private http: HttpClient) { }

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		}),
		observe: 'response' as 'body'
	};

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}


	addOrder(order: Order): Observable<Order> {
		return this.http.post<Order>(this.URL + "create/", order, this.httpOptions)
			.pipe(
				catchError(this.handleError('addOrder', order))
			);
	}

	getAllOrders(): Observable<Order[]> {
		return this.http.get<Order[]>(this.URL + 'all/')
	}
	
	getNLastOrders(n: number): Observable<Order[]> {
		return this.http.get<Order[]>(this.URL + 'lastorders/' + n)
	}

	getOrders(user: number): Observable<Order[]> {
		return this.http.get<Order[]>(this.URL + "user/" + user)
		.pipe(
			tap(_ => console.log("Service called"))
		)
	}

	getOrder(order: number): Observable<Order> {
		return this.http.get<Order>(this.URL + order)
		.pipe(
			tap(_ => console.log("Service called"))
		)
	}

	getOrdersByIDs(orders: Order[]): Observable<Order[]> {

		var ordersString = '?';

		for (let order of orders){
			ordersString += 'order=' + order.id
		}
		console.log(ordersString)
		return this.http.get<Order[]>(this.URL + ordersString)
		.pipe(
			tap(_ => console.log("Service called"))
		)
	}

	updateOrder(orderID: number, newOrder: Order): Observable<Order> {
		return this.http.put<Order>(this.URL + "update/" + orderID, newOrder, this.httpOptions)
		.pipe(
			tap(_ => console.log("Service called"))
		)
	}

	getOrdersByRangeTime(radius: number, warehouseID: number, date: NgbDate): Observable<Order[]>{
		return this.http.get<Order[]>(
			this.URL + "filterRangeTime/" + 
			this.dateToStringWithZeros(date) + '/' +
			warehouseID + '/' +
			radius)
			.pipe(
				tap(_ => console.log("Service called"))
			)
	}

	getFilteredOrders(date_min: NgbDate, date_max: NgbDate, by: number): Observable<Order[]> {
		return this.http.get<Order[]>(this.URL + 'filter/' + 
		this.dateToStringWithZeros(date_min) + '/' + 
		this.dateToStringWithZeros(date_max) + '/' + 
		by)
	}

	getProcessingOrders(warehouse: number): Observable<Order[]> {
		return this.http.get<Order[]>(this.URL + 'processing/' + warehouse)
	}

	acceptOrders(order: Order): Observable<Order> {
		return this.http.put<Order>(this.URL + 'accept/' + order.id, order.id)
	}

	forceCustom() {
		return this.http.get(this.URL + 'forceCustom/')
	}


	dateToStringWithZeros(date: NgbDate){
		var zero = ""
		var day_zero = ""
		if (date.month < 10) zero = "0"
		if (date.day < 10) day_zero = "0"
		return (date.year + '-' + zero + date.month + '-' + day_zero + date.day )  		
	}
}

