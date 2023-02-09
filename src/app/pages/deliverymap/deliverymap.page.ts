import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { Geolocation } from '@capacitor/geolocation';



const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';



@Component({
  selector: 'app-deliverymap',
  templateUrl: './deliverymap.page.html',
  styleUrls: ['./deliverymap.page.scss'],
})




export class DeliverymapPage implements OnInit {

  private map:any;

  lat : number = 0
  lon : number = 0



  commercialLat! : number
  commercialLon! : number

  markerCom! : L.Marker
  markerCli! : L.Marker

  constructor(private router : Router) {
    var coords = this.router.getCurrentNavigation()?.extras.state
    console.log(this.router.getCurrentNavigation())
    this.lat = parseFloat(coords?.['lat'])
    this.lon = parseFloat(coords?.['lon'])
  }


  ngOnInit() {

    this.onInitMap(this.lat, this.lon)
  }



  gotoLivraison(){
    this.router.navigate(['/home/livraison'])
  }

   async onInitMap(lat : number, lon : number) {


    const coordinates = await Geolocation.getCurrentPosition();

   this.commercialLat= coordinates.coords.latitude,
   this.commercialLon = coordinates.coords.longitude,

   console.log("lat "+this.commercialLat)
   console.log("lon "+this.commercialLon)

   this.map = L.map('map', {
    center: [this.commercialLat, this.commercialLon],
    attributionControl: false,
    zoom: 14
  });


    this.markerCom = L.marker([this.commercialLat, this.commercialLon], {draggable : false}).bindPopup('Moi');

    this.markerCom.addTo(this.map);

    this.markerCli = L.marker([lat, lon], {draggable : false}).bindPopup('Client');

    this.markerCli.addTo(this.map);









      L.Marker.prototype.options.icon = L.icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
    });




    L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: `https://router.project-osrm.org/route/v1/`
      }),
      showAlternatives: true,
      fitSelectedRoutes: false,
      show: true,
      routeWhileDragging: true,
      waypoints: [
        L.latLng(this.commercialLat,this.commercialLon),
        L.latLng(lat, lon)
      ],
      useZoomParameter : true
    }).addTo(this.map);
    tiles.addTo(this.map);
  }

}
