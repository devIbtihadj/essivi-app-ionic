import { Component, OnInit } from '@angular/core';
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

  constructor(private securityService : SecurityService) { }

  ngOnInit() {
    this.onGetCommercialInfo()
    console.log('init profil')
  }

  onClick(){

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

}
