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

	selectedNumber: number;

	addDelAdr: boolean;

	customer: number;
	retailer: number;
	availableDate: NgbDate;

	map: mapboxgl.Map;
	style = 'mapbox://styles/mapbox/streets-v11';
	lat = 0;
	lng = 0;
	marker: mapboxgl.Marker;

	locations: Location[];
	location: Location;
	timings: timing[];
	startTiming: Time;
	endTiming: Time;
	weight: number;
	addressString: Address;
	description: string;

	users: User[];
	warehouses: Warehouse[];
	selectedWarehouse: number;

	deliveryDate: NgbDate;
	dateOptions = {

	}

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


	async taddLocation() { //Final version
		this.timings = [
			new timing(
				this.datetimeToString(this.deliveryDate, this.startTiming),
				this.datetimeToString(this.deliveryDate, this.endTiming),
		)]
		
		this.location = new Location(
			this.marker.getLngLat().lat,
			this.marker.getLngLat().lng,
			this.timings
		)
		
		if(!this.locationExists(this.locations, this.location) && this.timings != undefined){
			this.locations.push(this.location)
			this.changeDetection.detectChanges();
			console.log(this.locations.length)
		}	
		
		await this.getLocationAddress(this.marker.getLngLat().lng, this.marker.getLngLat().lat)
		//this.getLocationAddress(-7.429216007254041, 39.28915325077671)
	}

	async addLocation() { //TEST VERSION
		
		this.timings = [
			new timing(
				this.datetimeToString(this.deliveryDate, this.startTiming),
				this.datetimeToString(this.deliveryDate, this.endTiming),
		)]
		
		console.log(this.timings)

		
		this.location = new Location(
			-7.429216007254041,
			39.28915325077671,
			this.timings
		)
		
		if(!this.locationExists(this.locations, this.location) && this.timings != undefined){
			this.locations.push(this.location)
			this.changeDetection.detectChanges();
			console.log(this.locations.length)
		}
		
		
		console.log(this.users)
		await this.getLocationAddress(-7.429216007254041, 39.28915325077671)
	}

	getLocationAddress(longitude: number, latitude: number) {
		 this.geocodingService.getAddress(longitude, latitude)
			.subscribe({next: (data: Address) => this.addressString = {
				type: data.type,
				query: data.query,
				features: data.features,
				attribution: data.attribution
			}});
	}

	locationExists(locations: Location[], location: Location) {
		if (locations != undefined)
			for(let i of Object.keys(locations))
				if (locations[i].latitude == location.latitude && locations[i].longitude == location.longitude)
					return true
		return false
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

	dateToString(date: NgbDate,){
		return (date.year + '-' + date.month + '-' + date.day)
	}

	datetimeToString(date: NgbDate, time: Time){
		return (date.year + '-' + date.month + '-' + date.day + ' ' + time)
	}
}

