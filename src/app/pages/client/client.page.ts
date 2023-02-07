import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ClientModel } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  @ViewChild(IonModal) modal! : IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name! : string;

  constructor(private clientService : ClientService, private securityService : SecurityService) { }

  clients! : ClientModel[]



  ngOnInit() {

    this.onGetMyClients()
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
