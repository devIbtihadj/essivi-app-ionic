import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, IonModal, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ClientModel, clientModelClass } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { SecurityService } from 'src/app/services/security.service';
import { Geolocation } from '@capacitor/geolocation';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  @ViewChild(IonModal) modal! : IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name! : string;
  prenom! : string;
  quartier! : string;
  longitude! : number;
  latitude! : number
  numTel! : number

  clientAdd : clientModelClass = new clientModelClass()

  isModalOpen = false;




  constructor(private clientService : ClientService, private securityService : SecurityService,
    private toastController : ToastController, private router : Router
    ) { }

  clients! : ClientModel[]



  ngOnInit() {
    this.onGetMyClients()

  }




 printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log('Current position:', coordinates);
};


  async addClient(){
    const coordinates = await Geolocation.getCurrentPosition();

  console.log('Current position:', coordinates);

  this.longitude = coordinates.coords.longitude,
  this.latitude = coordinates.coords.latitude
    this.securityService.getUtilisateurId().then((id)=>{





      this.clientAdd.latitude=this.latitude
      this.clientAdd.longitude=this.longitude
      this.clientAdd.nom=this.name
      this.clientAdd.prenom=this.prenom
      this.clientAdd.quartier=this.quartier
      this.clientAdd.numTel=this.numTel+""


      console.log(this.clientAdd)



      this.clientService.addClient(parseInt(id), this.clientAdd).subscribe({
        next : async (data)=>{

          const toast = await this.toastController.create({
            message: 'Client ajouté avec succès!',
            duration: 2500,
            position: 'top',
            color : 'success'
          });

          await toast.present();


          this.cancel()
          this.name=""
          this.prenom=""
          this.numTel=NaN
          this.quartier=""
          this.onGetMyClients()
        }, error : (err)=>{
          console.log("err "+err)
        }
      })
    })
  }



  onGetMyClients(){

    this.securityService.getUtilisateurId().then((id)=>{
      this.clientService.getMyClients(parseInt(id)).subscribe({
        next : (data)=>{
          console.log(data)
          this.clients=data.data
        }
      })
    })






  }



  gotoMaps(client : ClientModel){
    console.log(client.latitude)
    this.router.navigateByUrl('/maps', {
      state : {
        lon : client.longitude,
        lat : client.latitude
      }
    }).then((bool)=>{
      console.log(bool)
    }).catch((err)=> console.log(err))
  }











setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }




  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }



}
