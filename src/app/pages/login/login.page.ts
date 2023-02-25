import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginFormGroup! : FormGroup
  constructor(private fb : FormBuilder, private securityService : SecurityService, private router : Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      email : this.fb.control(null),
      password : this.fb.control(null)
    })
  }

  onLog(){
    console.log(this.loginFormGroup.value)
    this.securityService.login(this.loginFormGroup.value).subscribe({
      next : (data)=>{
        console.log(data)
        this.securityService.setUtilisateurId(data.data.utilisateur.id)
        this.securityService.setToken(data.data.token)
        this.router.navigate(['/home/dashboard'])
      }, error : (err)=>{
         this.presentToast(err)
        console.log(err)
      }
    })
  }









  async presentToast(backendIp : string) {
    const toast = await this.toastController.create({
      message: JSON.stringify(backendIp)+'',
      duration: 3000,
      icon : "sad-outline",
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Fermer',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }



}



