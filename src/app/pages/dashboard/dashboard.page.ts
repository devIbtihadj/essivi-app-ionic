import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor() { }

  ngOnInit() {
  }


  ionViewWillLeave(){
    console.log("Dashboard ionViewWillLeave")
  }

  ionViewWillEnter(){
    console.log("Dashboard ionViewWillEnter")
  }
}
