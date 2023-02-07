import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeModel } from 'src/app/models/commande.model';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(private router : Router, private route : ActivatedRoute, private commandeService : CommandeService) { }

  commande! : CommandeModel


  ngOnInit() {

    this.commandeService.getCommande(this.route.snapshot.params['id']).subscribe({
      next : (data)=>{
        this.commande = data.data
        console.log(data)
      }
    })



  }




  onGetLivraisonsPage(){
    this.router.navigate(['/home/livraison'])
  }
}
