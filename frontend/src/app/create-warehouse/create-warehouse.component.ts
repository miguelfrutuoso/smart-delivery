import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { Warehouse } from '../models/warehouse';
import { WarehouseService } from '../services/warehouse/warehouse.service';

@Component({
	selector: 'app-create-warehouse',
	templateUrl: './create-warehouse.component.html',
	styleUrls: ['./create-warehouse.component.css']
})
export class CreateWarehouseComponent implements OnInit {

	constructor(private warehouseService: WarehouseService, private router: Router) { }

	warehouse: Warehouse = new Warehouse; 

	//map variables
	map: mapboxgl.Map;
	style = 'mapbox://styles/mapbox/streets-v11';
	lat = 39.26764454806035;
	lng = -7.424245315921256;
	marker: mapboxgl.Marker;

	ngOnInit(): void {
		//map initialization
		Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set('pk.eyJ1IjoibWlndWVsZnJ1dHVvc28iLCJhIjoiY2txdjljYWVpMDllNzJ6cDYzazg2dmhoZiJ9.2wSd1RH1bT_aKfCZaAdtVg');
		this.map = new mapboxgl.Map({
			container: 'map',
			style: this.style,
			zoom: 10,
			center: [this.lng, this.lat]
		});
		// Add map controls
		this.map.addControl(new mapboxgl.NavigationControl());

		this.marker = new mapboxgl.Marker({
			color: "#FFFFFF",
			draggable: true
		}).setLngLat([this.lng, this.lat])
			.addTo(this.map);
	}

	createWarehouse() {
		this.warehouse.latitude = this.lat;
		this.warehouse.longitude = this.lng;
		this.warehouseService.createWarehouse(this.warehouse).subscribe(
			(data) => {
				this.router.navigate(['/admin-dashboard'])
			}
		)
			
		
	}

}
