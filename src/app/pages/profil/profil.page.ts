import { ClientService } from './../../services/client.service';
import { CommandeService } from './../../services/commande.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  nom! : string
  prenom! : string
  nbClients! : string
  nbLivraisons! : string

  notifications! : number

  darkTheme! : boolean


  language! : number
  constructor(private securityService : SecurityService, private alertController : AlertController, private router : Router, 
    private commercialService : CommandeService, private clienService : ClientService, private commandeService:CommandeService) { }

  ngOnInit() {
    
  }


  onInitParam(idCOm : number){
    this.clienService.getMyClients(idCOm).subscribe({
      next :(data)=>{
        this.nbClients=data.data.length
      }
    })

    this.commandeService.getCommercialLivraisons(idCOm).subscribe({
      next:(data)=>{
        this.nbLivraisons=data.data.length
      }
    })
  }

  ionViewWillLeave(){
    console.log("Prodil ionViewWillLeave")
  }

  ionViewWillEnter(){
    this.onGetCommercialInfo()
    console.log("Profil ionViewWillEnter")
  }


  geToLogin(){
    this.router.navigateByUrl('/login')
  }
  onClick(){

  }

  changePassword(){


    this.presentAlert()




  }
  onGetCommercialInfo(){
    this.securityService.getUtilisateurId().then((id)=>{
      this.securityService.me(parseInt(id)).subscribe({
        next : (data)=>{
          console.log(data)
          this.nom = data.data.nom
          this.prenom = data.data.prenom
          this.onInitParam(parseInt(id))
        }
      })
    })
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Nouveau mot de passe',
      buttons: ['OK'],
      inputs: [
        {
          placeholder: 'Saisir ici ...',
        },
      ],
    });

    await alert.present();
  }

}
