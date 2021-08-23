import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from "moment";
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	readonly URL = 'http://127.0.0.1:8000/api/'

	loggedUser: User;

	constructor(private http: HttpClient) { }

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		}),
		observe: 'response' as 'body'
	};

	public isLoggedIn() {
		return !!this.getJwtToken();
	}

	getJwtToken() {
		return localStorage.getItem('access_token');
	}

	login(user: User) {
		return this.http.post<any>(this.URL + 'token/', user, this.httpOptions)
			.pipe(
				map(loginUser => {
					localStorage.setItem('access_token', loginUser.body.access)
					localStorage.setItem('refresh_token', loginUser.body.refresh)
				}),
			)
	}

	logout() {
		return this.http.post<any>(this.URL + 'user/logout/blacklist/', {refresh_token: localStorage.getItem('refresh_token')})
			.pipe(
				tap(() => this.logoutUser())
			)
	}
	
	logoutUser() { 
		localStorage.removeItem('access_token')
		localStorage.removeItem('refresh_token')
	}

	refreshToken() {
		return this.http.post<any>(this.URL + 'token/refresh/', {'refresh':  this.getRefreshToken()})
			.pipe(
				tap(response => {
					localStorage.setItem('access_token', response.access);					
				})
			)
	}

	private getRefreshToken() {
		return localStorage.getItem('refresh_token');
	}
	
	getUserLogged(): Observable<User>{
		return this.http.get<User>(this.URL + 'user/current/')
	}

}
