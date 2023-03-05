import { CommandeModel } from './../models/commande.model';
import { CommandeService } from './../services/commande.service';
import { SecurityService } from './../services/security.service';
import { Component, OnInit } from '@angular/core';

import { Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';






@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  commId! : number
  commandes : CommandeModel[] = []



  constructor(private navconroller : NavController, private securityService : SecurityService, private commandeService : CommandeService) {}
  ngOnInit(): void {
    this.onInitMyNotDelivery()
  }



  
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



  onInitMyNotDelivery(){
    this.securityService.getUtilisateurId().then((id)=>{
      this.commId = parseInt(id)
      this.commandeService.getAllCommandesNotDeliverd().subscribe({
        next:(data)=>{
          console.log("*********************************************"+data.data)
          //this.commandes = data.data


          for (let i = 0; i < data.data.length; i++) {

            if(data.data[i].client.commercial.id==id){
              this.commandes.push(data.data[i])
            }

          }

          console.log("///////////////////////////"+this.commandes.length)


        }
      })

    })
  }
}
