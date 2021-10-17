import { Component, OnInit } from '@angular/core';


declare const L: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  
  }
  map(){
    if (!navigator.geolocation) {
      console.log('location is not supported');

    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords=position.coords;
      const latLong= [coords.latitude, coords.longitude];
      console.log(`lat: ${coords.latitude}, lon: ${coords.longitude}`);
      let mymap = L.map('mapid').setView(latLong, 13);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVuYWRpIiwiYSI6ImNrdXRmM2x3ZzBqbTYyb3A3ODg0cjRwNTQifQ.RLzASgmz3qlJG4HUSkgG0Q',
       {
    attribution:
     'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}
).addTo(mymap);
let marker = L.marker(latLong).addTo(mymap);

    });
    this.watchPosition();
  }
  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition((position) => {
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      if (position.coords.latitude == desLat) {
        navigator.geolocation.clearWatch(id);
      }
    }, (err) => {
      console.log(err);
    }, {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    })

  }
}
