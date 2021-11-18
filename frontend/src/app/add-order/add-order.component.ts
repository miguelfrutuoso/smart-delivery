import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgbDate, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import * as mapboxgl from 'mapbox-gl';
import { Time } from "@angular/common";

import { User } from '../models/user'
import { Location } from '../models/location'
import { timing } from '../models/timing'
import { Address } from '../models/address'
import { Order } from '../models/order'
import { Warehouse } from '../models/warehouse';

import { GeocodingService } from '../services/geocoding/geocoding.service'
import { OrderService } from '../services/order/order.service'
import { GetUsersService } from '../services/get-users/get-users.service'
import { WarehouseService } from '../services/warehouse/warehouse.service'

@Component({
	selector: 'app-add-order',
	templateUrl: './add-order.component.html',
	styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {

	constructor(
		private changeDetection: ChangeDetectorRef, 
		private geocodingService: GeocodingService,
		private OrderService: OrderService,
		private getUsersService: GetUsersService,
		private warehouseService: WarehouseService,
		private config: NgbDatepickerConfig) { 
			
			var date = new Date();
			config.minDate = {
				year: date.getFullYear(),
				month: date.getMonth() + 1,
				day: date.getDate()
			}
			config.outsideDays = 'hidden';
	}
	
	addDelAdr: boolean;

	customer: number;
	retailer: number;
	availableDate: NgbDate;

	//map variables
	map: mapboxgl.Map;
	style = 'mapbox://styles/mapbox/streets-v11';
	lat = 39.294580801281825;
	lng = -7.4307729197902574;
	marker: mapboxgl.Marker;

	locations: Location[];
	//location: Location;
	startTiming: Time;
	endTiming: Time;
	weight: number;
	addressString: Address;
	description: string;

	users: User[];
	warehouses: Warehouse[];
	selectedWarehouse: number;

	deliveryDate: NgbDate;

	ngOnInit(): void {
		//map initialization
		this.addDelAdr = true;

		Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set('pk.eyJ1IjoibWlndWVsZnJ1dHVvc28iLCJhIjoiY2txdjljYWVpMDllNzJ6cDYzazg2dmhoZiJ9.2wSd1RH1bT_aKfCZaAdtVg');
		this.map = new mapboxgl.Map({
			container: 'map',
			style: this.style,
			zoom: 2,
			center: [this.lng, this.lat]
		});
		// Add map controls
		this.map.addControl(new mapboxgl.NavigationControl());
		
		this.marker = new mapboxgl.Marker({
			color: "#FFFFFF",
			draggable: true
		}).setLngLat([this.lng, this.lat])
			.addTo(this.map);

		this.locations = []
		this.getUsers()
		this.getWarehouses()
	}

	async getWarehouses() {
		await this.warehouseService.getWarehouses().subscribe(warehouses => this.warehouses = warehouses)
	}

	async addLocation() { 
		
		var timings = [
			new timing(
				this.datetimeToString(this.deliveryDate, this.startTiming),
				this.datetimeToString(this.deliveryDate, this.endTiming),
		)]

		var location = new Location(
			this.marker.getLngLat().lng,
			this.marker.getLngLat().lat,
			timings
		)
		
		this.geocodingService.getAddress(this.marker.getLngLat().lng, this.marker.getLngLat().lat) // Get place name 
			.subscribe({next: (data: Address) => location.addressString = {
				type: data.type,
				query: data.query,
				features: data.features,
				attribution: data.attribution
			}});
		

		if(timings != undefined){ // add new location to array of locations
			this.locations.push(location)
			this.changeDetection.detectChanges();
		}	
	}

	async getLocationAddress(longitude: number, latitude: number) {
		var address: Address;
		this.geocodingService.getAddress(longitude, latitude)
		.subscribe({next: (data: Address) => address = {
			type: data.type,
			query: data.query,
			features: data.features,
			attribution: data.attribution
		}});

		return address.features[0].place_name
	}

	async addOrder() {
		await this.OrderService.addOrder(
		 	new Order(
		 		this.customer, 
		 		this.retailer,
				(this.availableDate.year + '-' + (this.availableDate.month - 1) + '-' + this.availableDate.day),
				this.weight,
		 		this.locations,
				this.description,
				this.selectedWarehouse)).subscribe()
		
	}

	async getUsers(){
		await this.getUsersService.getUsers()
			.subscribe(users => this.users = users)
	}

	dateToString(date: NgbDate,){ // tranform NbgDate to String
		return (date.year + '-' + date.month + '-' + date.day)
	}

	datetimeToString(date: NgbDate, time: Time){ // tranform NbgDate and time to String
		return (date.year + '-' + date.month + '-' + date.day + ' ' + time)
	}
}

