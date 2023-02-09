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
  constructor(private securityService : SecurityService, private alertController : AlertController) { }

  ngOnInit() {
    this.onGetCommercialInfo()
    console.log('init profil')
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
