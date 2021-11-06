import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { RegisterService } from '../services/register/register.service';
import { Router } from '@angular/router'
import * as mapboxgl from 'mapbox-gl';

@Component({
	selector: 'app-create-user',
	templateUrl: './create-user.component.html',
	styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

	constructor(private registerService: RegisterService, private router: Router) { }

	user: User = new User;

	map: mapboxgl.Map;
	style = 'mapbox://styles/mapbox/streets-v11';
	lat = 0;
	lng = 0;
	marker: mapboxgl.Marker;

	ngOnInit(): void {
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

	createUser() {
		this.user.standart_longitude = this.marker.getLngLat().lng
		this.user.standart_latitude = this.marker.getLngLat().lat
		this.registerService.registUser(this.user).subscribe(
			() => this.router.navigate(['/admin-dashboard'])
		)
	}
}
