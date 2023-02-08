import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CommandeModel } from 'src/app/models/commande.model';
import { CommandeService } from 'src/app/services/commande.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(private router : Router, private route : ActivatedRoute, private commandeService : CommandeService,
    private alertController: AlertController, private securityService : SecurityService,
    private toastController : ToastController
    ) { }

  commande! : CommandeModel
  marques : string[] = []
  filteredMarques : string[] = []
  somme : number = 0

  handlerMessage = '';
  roleMessage = '';


  ngOnInit() {
    console.log("init detail")

    this.commandeService.getCommande(this.route.snapshot.params['id']).subscribe({
      next : (data)=>{
        this.commande = data.data
        console.log(data)

        this.commande.details.forEach(d => {
          this.marques.push(d.type_vente.marque.libelle_marque)
          this.somme = this.somme + d.qte*d.type_vente.prix_unit
          console.log(this.somme)
        });

        this.filteredMarques = this.marques.filter((ele , pos) =>{
          return this.marques.indexOf(ele) == pos;
      })

      }
    })


  }







  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Attention!',
      subHeader : 'Confirmez-vous avoir reçu la somme de '+this.somme+ 'FCFA?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Oui',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();


    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;



    const toast = await this.toastController.create({
      message: 'Validé avec succès!',
      duration: 2500,
      position: 'top',
      color : 'success'

    });


    if(role=='confirm'){
      console.log('confirrrrrrrrrrrrm')
      this.securityService.getUtilisateurId().then((id)=>{
        this.commandeService.livrerCommande(parseInt(id), this.commande.id).subscribe({
          next : async (data)=>{

          await toast.present();

          this.router.navigate(['/home/livraison'])

          }
        })
      })
    }

  }











  onGetLivraisonsPage(){
    this.router.navigate(['/home/livraison'])
  }
}
