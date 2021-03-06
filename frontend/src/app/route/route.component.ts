import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import * as mapboxgl from 'mapbox-gl';

import { Order } from '../models/order'
import { Location } from '../models/location'
import { Route } from '../models/route'
import { Address } from '../models/address'
import { marker } from '../models/markers'

import { RouteService } from '../services/route/route.service'
import { OrderService } from '../services/order/order.service'
import { GeocodingService } from '../services/geocoding/geocoding.service'

@Component({
	selector: 'app-route',
	templateUrl: './route.component.html',
	styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

	constructor(
		private urlroute: ActivatedRoute,
		private routeService: RouteService,
		private orderService: OrderService,
		private geocodingService: GeocodingService) { }

	route: Route;
	id: number;
	orderIDs: number[];
	ordersAddresses: string[] = [];
	
	coordenadas;

	map: mapboxgl.Map;
	style = 'mapbox://styles/mapbox/streets-v11';

	markers: marker;

	addRoute(coords) {
		if (this.map.getSource('route')){
			this.map.removeLayer('route')
			this.map.removeSource('route')
		}
		else {
			this.map.addLayer({
				id: 'route',
				type: 'line',
				source: {
				  type: 'geojson',
				  data: {
					type: 'Feature',
					properties: {},
					geometry: coords
				  }
				},
				layout: {
				  'line-join': 'round',
				  'line-cap': 'round'
				},
				paint: {
				  'line-color': '#03AA46',
				  'line-width': 8,
				  'line-opacity': 0.8
				}
			  });
		}
	}

	ngOnInit(): void {

		this.urlroute.queryParams.subscribe(params => {
			this.id = params['id'];
		});
		var coordenadas = []

		this.routeService.getRoute(this.id).subscribe(
			route => {
				this.route = this.filterSortRoute(route);
				//this.getOrderDetails()
				console.log(this.route)
				this.getOrdersAddress(this.route.orders) // get orders's adresses

				for(let order of this.route.orders) {
					coordenadas.push(order.ordertimelocation[0].longitude + ', ' + order.ordertimelocation[0].latitude)
				}
				//create markers
				this.markers = {type: 'FeatureCollection', features : []}
				for(const [i, coordenate] of coordenadas.entries()){
					this.markers.features.push(
						{
							type: 'Feature',
							properties: {
								id: i+1,
								message: 'Point',
								iconSize: [30, 30]
							},
							geometry: {
								type: 'Point',
								coordinates: [coordenate.split(",").map(Number)[0], coordenate.split(",").map(Number)[1]]
							}
						}
					)
				}
				
				for(const marker of this.markers.features) {
					const width = marker.properties.iconSize[0];
					const height = marker.properties.iconSize[1];
					const number = document.createTextNode(marker.properties.id.toString());
					const el = document.createElement('div');
					el.appendChild(number)
					el.style.backgroundColor = '#0076FF'
					el.style.paddingTop = '5px';
    				el.style.paddingLeft = '9px';
					el.className = 'marker';
					el.style.borderRadius = '50%'
					el.style.width = `${width}px`;
					el.style.height = `${height}px`;
					el.style.backgroundSize = '100%';
					el.className = 'marker';
					el.style.fontFamily = "Nunito"
					el.style.fontSize = "19px"
					el.style.color = '#fff'
					new mapboxgl.Marker(el)
					.setLngLat(marker.geometry.coordinates)
					.addTo(this.map)
				}
			}
			
		)

/*
		this.routeService.getRoute(this.id)
		.subscribe(route => this.route = route,
			() => this.getOrderDetails(),
			() => {
				this.route.orders = this.filterSortOTL(this.route.orders)
				for(let order of this.route.orders) {
					coordenadas.push(order.ordertimelocation[0].latitude + ', ' + order.ordertimelocation[0].longitude)
				}

				//create markers
				this.markers = {type: 'FeatureCollection', features : []}
				for(const [i, coordenate] of coordenadas.entries()){
					this.markers.features.push(
						{
							type: 'Feature',
							properties: {
								id: i+1,
								message: 'Point',
								iconSize: [30, 30]
							},
							geometry: {
								type: 'Point',
								coordinates: [coordenate.split(",").map(Number)[0], coordenate.split(",").map(Number)[1]]
							}
						}
					)
				}
				
				for(const marker of this.markers.features) {
					const width = marker.properties.iconSize[0];
					const height = marker.properties.iconSize[1];
					const number = document.createTextNode(marker.properties.id.toString());
					const el = document.createElement('div');
					el.appendChild(number)
					el.style.backgroundColor = '#0076FF'
					el.style.paddingTop = '5px';
    				el.style.paddingLeft = '9px';
					el.className = 'marker';
					el.style.borderRadius = '50%'
					el.style.width = `${width}px`;
					el.style.height = `${height}px`;
					el.style.backgroundSize = '100%';
					el.className = 'marker';
					el.style.fontFamily = "Nunito"
					el.style.fontSize = "19px"
					el.style.color = '#fff'
					new mapboxgl.Marker(el)
					.setLngLat(marker.geometry.coordinates)
					.addTo(this.map)
				}
			}
		)*/
	
		Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set('pk.eyJ1IjoibWlndWVsZnJ1dHVvc28iLCJhIjoiY2txdjljYWVpMDllNzJ6cDYzazg2dmhoZiJ9.2wSd1RH1bT_aKfCZaAdtVg');
		this.map = new mapboxgl.Map({
			container: 'map',
			style: this.style,
			zoom: 15,
			center: [-7.429291212334658, 39.28905923437133,]
		});
		// Add map controls
		this.map.addControl(new mapboxgl.NavigationControl());
		
		
		//create route line
		this.map.on('load', () => {
			this.geocodingService.getMatch('driving', coordenadas, Array(coordenadas.length).fill(50)).subscribe(
				coords => this.addRoute(coords)
		   )
		})

		
		
	}

	getOrderDetails(){
		console.log(this.route.orders)
		this.orderService.getOrdersByIDs(this.route.orders)
		.subscribe(orders => this.route.orders = orders)
	}

	filterSortRoute(route: Route) {

		for (let order of route.orders){ // TODO o que ?? que isto t?? aqui a fazer????
			for (let otl of order.ordertimelocation)
				if (otl.selected)
			 		order.ordertimelocation = [otl]
		}
		route.orders.sort(this.compare)

		return route
	}

	compare(a:Order, b:Order) { // function to order locations
		if(a.ordertimelocation[0].nth_order > b.ordertimelocation[0].nth_order)
			return 1
		if(a.ordertimelocation[0].nth_order < b.ordertimelocation[0].nth_order)
			return -1
		return 0
	}

	async getOrdersAddress(orders: Order[]){
		for (let order of orders){
			await this.geocodingService.getAddress(order.ordertimelocation[0].longitude, order.ordertimelocation[0].latitude)
				.subscribe( (data: Address) => order.ordertimelocation[0].place_name = data.features[0].place_name)
			}
	}
}
