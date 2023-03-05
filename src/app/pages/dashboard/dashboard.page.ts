import { environment } from './../../../environments/environment.prod';
import { Type_venteMoel } from './../../models/type_vente.model';
import { ProduitService } from './../../services/produit.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  listProduits! : Type_venteMoel[]
  backendStaticFolder : string = ""+environment.backendHost+"static"
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private produitService : ProduitService) { }

  ngOnInit() {
    this.onGetAllProduits()
  }


  ionViewWillLeave(){
    console.log("Dashboard ionViewWillLeave")
  }

  ionViewWillEnter(){
    console.log("Dashboard ionViewWillEnter")
    this.onGetAllProduits()
  }



  onGetAllProduits(){
    this.produitService.getAllTypeVente().subscribe({
      next:(data)=>{
        this.listProduits=data.data
      }
    })
  }
}
