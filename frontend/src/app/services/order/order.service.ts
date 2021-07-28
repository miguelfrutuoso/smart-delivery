import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order } from '../../models/order'
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
		console.log("Order service called")
		console.log(order)
		console.log("Order service called")
		return this.http.post<Order>(this.URL + "create/", order, this.httpOptions)
			.pipe(
				catchError(this.handleError('addOrder', order))
			);
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

	updateOrder(orderID: number, newOrder: Order): Observable<Order> {
		console.log(this.URL + "update/" + orderID)
		console.log(newOrder)
		return this.http.put<Order>(this.URL + "update/" + orderID, newOrder, this.httpOptions)
		.pipe(
			tap(_ => console.log("Service called"))
		)
	}

}

