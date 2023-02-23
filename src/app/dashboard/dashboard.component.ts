import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapAnchorPoint, MapInfoWindow } from '@angular/google-maps';
import { interval, Observable, Subscription, tap } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

interface BusCoordinates {
	VehicleID: number;
	Latitude: number;
	Longitude: number;
	Time: string;
}

interface Card {
	title: string;
	cols: number;
	rows: number;
}


interface Marker {
	position: google.maps.LatLngLiteral;
	info: { text: string };
	options: { animation: google.maps.Animation, icon: string };
}

interface Bounds {
	north: number;
	south: number;
	east: number;
	west: number;
}

enum EIcon {
	path = 'assets/bus.png'
};

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	@ViewChild(GoogleMap, { static: false }) map: GoogleMap;
	@ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
	/** Based on the screen size, switch from standard to one column per row */
	cards: Observable<Card[]> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
		map(({ matches }) => {
			if (matches) {
				return [
					{ title: 'Bus Route', cols: 1, rows: 1 },
				];
			}

			return [
				{ title: 'Bus Route', cols: 2, rows: 1 },
			];
		})
	);
	zoom = 16;
	infoContent = '';
	markers: Marker[] = [];
	vertices: google.maps.LatLngLiteral[] = [];
	private jsonURL = 'assets/many_bus.json';
	private subscriptions = new Subscription();
	intervalSubscription = new Subscription();
	busesList: BusCoordinates[] = [];
	coordinates: BusCoordinates[] = [];
	routes: BusCoordinates[] = [];

	center: google.maps.LatLngLiteral = {
		lat: 0,
		lng: 0
	};

	options: google.maps.MapOptions = {
		mapTypeId: 'roadmap',
		zoomControl: true,
		scrollwheel: false,
		disableDoubleClickZoom: true,
		zoom: this.zoom
	};

	constructor(
		private breakpointObserver: BreakpointObserver,
		private http: HttpClient
	) {
	}

	ngOnInit() {
		this.subscriptions.add(
			this.getJSON().pipe(
				tap((data: BusCoordinates[]) => {
					this.coordinates = data;
					this.busesList = this.filterBusesList(data);
					const { Latitude, Longitude } = this.coordinates[0];
					this.center = { lat: Latitude, lng: Longitude };
				})
			).subscribe()
		);
	}


	filterBusesList(data: BusCoordinates[]) {
		return data.filter((data: BusCoordinates, index: number, self) =>
			index === self.findIndex((item: BusCoordinates) => (item.VehicleID === data.VehicleID))
		);
	}


	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	selectBus(event: BusCoordinates) {

		this.routes = [];
		this.markers = [];
		this.routes = this.coordinates.filter(item => item.VehicleID === event.VehicleID);
		this.center = {
			lat: this.routes[0].Latitude,
			lng: this.routes[0].Longitude,
		};

		if (this.intervalSubscription) {
			this.intervalSubscription.unsubscribe();
		}

		let i = 0;
		this.intervalSubscription = interval(2000).pipe(
			takeWhile(() => i < this.routes.length),
		).subscribe(() => {
			this.addMarker(i)
			i++;
		});

	}

	addMarker(index: number) {
		this.markers.push({
			position: {
				lat: this.routes[index]?.Latitude,
				lng: this.routes[index]?.Longitude
			},
			info: {
				text: this.routes[index]?.Time,
			},
			options: {
				animation: google.maps.Animation.DROP,
				icon: EIcon.path
			},
		});

		const bounds = this.getBounds(this.markers);
		this.map.fitBounds(bounds);

	}

	public getJSON(): Observable<any> {
		return this.http.get(this.jsonURL);
	}

	openInfo(marker: MapAnchorPoint, content): void {
		this.infoContent = content.text;
		this.info.open(marker);
	}

	getBounds(markers: Marker[]) {
		let north;
		let south;
		let east;
		let west;

		for (const marker of markers) {
			// set the coordinates to marker's lat and lng on the first run.
			// if the coordinates exist, get max or min depends on the coordinates.
			north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
			south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
			east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
			west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
		};

		const bounds = { north, south, east, west };

		return bounds;
	}

	clearTracking() {
		if (this.intervalSubscription) {
			this.intervalSubscription.unsubscribe();
		}
		this.routes = [];
		this.markers = [];
		this.center = {
			lat: this.coordinates[0].Latitude,
			lng: this.coordinates[0].Longitude,
		};
	}

}
