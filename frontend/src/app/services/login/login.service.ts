import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { User } from '../../models/user'
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable()
export class LoginService {

	readonly URL = 'http://127.0.0.1:8000/api/token/'

	httpOptions = {
		headers: new HttpHeaders({ 
			'Content-Type': 'application/json' 
		}),
		observe: 'response' as 'body'
	};


	constructor(private http: HttpClient) { }

	login (user: User) {
		return this.http.post<any>(this.URL, user, this.httpOptions)
		.pipe(
			map(loginUser => {
				localStorage.setItem('access_token', loginUser.body.access)
				localStorage.setItem('refresh_token', loginUser.body.refresh)
			})
		)		
	}

}