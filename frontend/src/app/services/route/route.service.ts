import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Route } from '../../models/route'
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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
}
