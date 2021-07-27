import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../../models/user'

@Injectable({
	providedIn: 'root'
})
export class RegisterService {

	readonly URL = 'http://127.0.0.1:8000/api/user/register/'

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(private http: HttpClient) {

	}

	registUser(user: User): Observable<User> {
		return this.http.post<User>(this.URL, user, this.httpOptions)
			.pipe(
				catchError(this.handleError('registUser', user))
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
