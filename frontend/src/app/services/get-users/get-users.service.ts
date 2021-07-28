import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user'
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  readonly URL = environment.apiUrl + "user/"

  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.URL + "allUsers/")
    .pipe(
			tap(_ => console.log("Service called"))
		)
  }

  getUserDetail(id: number): Observable<User>{
    return this.http.get<User>(this.URL + "userDetail/" + id)
    .pipe(
			tap(_ => console.log("Service called"))
		)
  }
}
