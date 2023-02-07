import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeModel } from 'src/app/models/commande.model';
import { CommandeService } from 'src/app/services/commande.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.page.html',
  styleUrls: ['./livraison.page.scss'],
})
export class LivraisonPage implements OnInit {


  commandes : CommandeModel[] = []
  commId! : number




  constructor(private securityService : SecurityService, private commandeService : CommandeService,
  private router : Router) { }




  ngOnInit() {
  this.onInitMyNotDelivery()
  }




  onGetDetails(id : number){
    this.router.navigate(['/home/detail/'+id])
  }


  onInitCommercialId(){
    this.securityService.getUtilisateurId().then((id)=>{
      this.commId = parseInt(id)
    })
  }



  onGetNotDelivered(){
    this.commandeService.getAllCommandesNotDeliverd().subscribe({
      next:(data)=>{
        console.log(data.data)
        this.commandes = data.data
      }
    })
  }





  onInitMyNotDelivery(){
    this.securityService.getUtilisateurId().then((id)=>{
      this.commId = parseInt(id)
      this.commandeService.getAllCommandesNotDeliverd().subscribe({
        next:(data)=>{
          console.log(data.data)
          //this.commandes = data.data


          for (let i = 0; i < data.data.length; i++) {

            if(data.data[i].client.commercial.id==id){
              this.commandes.push(data.data[i])
            }

          }




        }
      })

    })
  }
}
