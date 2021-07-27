import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order } from '../../models/order'
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddOrderAdminService {

  readonly URL = "http://127.0.0.1:8000/api/order/create/"

  constructor(private http: HttpClient) { }

  httpOptions = {
		headers: new HttpHeaders({ 
			'Content-Type': 'application/json' 
		}),
		observe: 'response' as 'body'
	};


  addOrder(order: Order): Observable<Order> {
    console.log("Order service called")
    console.log(order)
    console.log("Order service called")
    return this.http.post<Order>(this.URL, order, this.httpOptions)
      .pipe(
        catchError(this.handleError('registUser', order))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error); 
			console.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}
}

