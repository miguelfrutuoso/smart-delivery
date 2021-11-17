import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Warehouse } from '../../models/warehouse'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class WarehouseService {

	readonly URL = environment.apiUrl + "warehouse/"

	constructor(private http: HttpClient) { }

	getWarehouses(): Observable<Warehouse[]> {
		return this.http.get<Warehouse[]>(this.URL)
		.pipe(
			tap(_ => console.log("Service called"))
		)
	}

	createWarehouse(warehouse: Warehouse): Observable<Warehouse> {
		return this.http.post<Warehouse>(this.URL + 'create/', warehouse)
	}
}
