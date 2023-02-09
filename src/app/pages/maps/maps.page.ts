import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { icon, Marker } from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { ClientModel } from 'src/app/models/client.model';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { SecurityService } from 'src/app/services/security.service';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';



@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  clients! : ClientModel[]


  private map:any;

  lat : number = 0
  lon : number = 0

  constructor(private router : Router, private clientService : ClientService, private securityService : SecurityService) {
    var coords = this.router.getCurrentNavigation()?.extras.state
    console.log(this.router.getCurrentNavigation())
    this.lat = parseFloat(coords?.['lat'])
    this.lon = parseFloat(coords?.['lon'])
   }

  ngOnInit() {


    console.log("lat "+this.lat)
    console.log("lon "+this.lon)


    this.onGetMyClients()

  }



  gotoClients(){
    this.router.navigate(['/home/client'])
  }



  onGetMyClients(){

    this.securityService.getUtilisateurId().then((id)=>{
      this.clientService.getMyClients(parseInt(id)).subscribe({
        next : (data)=>{
          console.log(data)
          this.clients=data.data

          this.onInitMap(this.lat, this.lon)
        }
      })
    })
  }

  onInitMap(lat : number, lon : number){

    this.map = L.map('map', {
      center: [lat, lon],
      attributionControl: false,
      zoom: 14
    });



    for (let i = 0; i < this.clients?.length; i++) {
      const element = this.clients[i];
      const clientMarker = L.marker([element.latitude, element.longitude]).bindPopup(element.nom+"")
      clientMarker.addTo(this.map)
    }




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
      useZoomParameter : true
    }).addTo(this.map);
    tiles.addTo(this.map);
  }


}
