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
			tap(_ => console.log("Geocoding service called"))
		)
	}

	getMatch(profile, coordinates, radius) {

		coordinates = coordinates.join(';');

		const radiuses = radius.join(';')

		return this.http.get('https://api.mapbox.com/matching/v5/mapbox/' + 
			profile + '/' + 
			coordinates + '?geometries=geojson&radiuses=' +
			radiuses + '&access_token=' +
			environment.access_token)
			.pipe(
				map((data: {code, message, matchings}) => {
					return data.matchings[0].geometry
				})
			)
				
	}
}
