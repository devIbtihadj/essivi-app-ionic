import { Component } from '@angular/core';

import { Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';






@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {





  constructor(private navconroller : NavController) {}



  changePageToCommande(){
    this.navconroller.pop()
    this.navconroller.navigateForward('/home/commande')
  }

  changePageToClient(){
    this.navconroller.pop()
    this.navconroller.navigateForward('/home/client')
  }

  onClick(){
    console.log("okkkk")
    this.navconroller.pop()
    this.navconroller.navigateRoot(['/home/livraison'])
  }
}
