import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbDate, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Time } from "@angular/common";
import { timing } from '../models/timing'
import { Location } from '../models/location'
import { Address } from '../models/address'
import { GeocodingService } from '../services/geocoding/geocoding.service'
import * as mapboxgl from 'mapbox-gl';

@Component({
	selector: 'app-location-time-picker',
	templateUrl: './location-time-picker.component.html',
	styleUrls: ['./location-time-picker.component.css']
})
export class LocationTimePickerComponent implements OnInit {

	deliveryDate: NgbDate;
	startTiming: Time;
	endTiming: Time;

	locations: Location[];
	location: Location;
	timings: timing[];
	addressString: Address;


	//map variables
	map: mapboxgl.Map;
	style = 'mapbox://styles/mapbox/streets-v11';
	lat = 39.294580801281825;
	lng = -7.4307729197902574;
	marker: mapboxgl.Marker;

	constructor(private changeDetection: ChangeDetectorRef,
		private geocodingService: GeocodingService,) { }

	ngOnInit(): void {
		this.locations = []

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

		if (!this.locationExists(this.locations, this.location) && this.timings != undefined) {
			this.locations.push(this.location)
			this.changeDetection.detectChanges();
		}

		await this.getLocationAddress(this.marker.getLngLat().lng, this.marker.getLngLat().lat)
		
	}

	async addLocation() { //TEST VERSION

		this.timings = [
			new timing(
				this.datetimeToString(this.deliveryDate, this.startTiming),
				this.datetimeToString(this.deliveryDate, this.endTiming),
			)]

		this.location = new Location(
			39.28915325077671,
			-7.429216007254041,
			this.timings
		)

		if (!this.locationExists(this.locations, this.location) && this.timings != undefined) {
			this.locations.push(this.location)
			this.changeDetection.detectChanges();
			console.log(this.locations.length)
		}
		
	}

	getLocationAddress(longitude: number, latitude: number) {
		this.geocodingService.getAddress(longitude, latitude)
			.subscribe({
				next: (data: Address) => this.addressString = {
					type: data.type,
					query: data.query,
					features: data.features,
					attribution: data.attribution
				}
			});
	}

	locationExists(locations: Location[], location: Location) {
		if (locations != undefined)
			for (let i of Object.keys(locations))
				if (locations[i].latitude == location.latitude && locations[i].longitude == location.longitude)
					return true
		return false
	}

	datetimeToString(date: NgbDate, time: Time) {
		return (date.year + '-' + (date.month - 1) + '-' + date.day + ' ' + time)
	}

}
