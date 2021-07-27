import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Address } from '../../models/address'
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class GeocodingService {

	readonly URL = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'

	limit = 1;

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		}),
		observe: 'response' as 'body'
	};

	constructor(private http: HttpClient) { }

	getAddress(longitude: number, latitude: number): Observable<Address> {	
		return this.http.get<Address>(this.URL +
			longitude + ',' +
			latitude +
			'.json?limit=' + this.limit +
			'&access_token=' + environment.access_token
		).pipe(
			tap(_ => console.log("Service called"))
		)
	}
}
