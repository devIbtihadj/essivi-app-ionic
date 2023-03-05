import { MarqueModel } from './../models/marque.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http : HttpClient) { }



  public getAllMarques() : Observable<any>{
    return this.http.get<any>(environment.backendHost+"marque/get/all")
  }

  public updateMarque(marque : MarqueModel) : Observable<any>{
    return this.http.put<any>(environment.backendHost+"marque/update/"+marque.id, marque)
  }

  public creerMarque(marque : MarqueModel) : Observable<any>{
    return this.http.post<any>(environment.backendHost+"/marque/creer", marque)
  }

  public deleteMarque(id : number) : Observable<any>{
    return this.http.delete<any>(environment.backendHost+"/marque/delete/"+id)
  }

  public creerType_vente(type_vente : FormData, idMarque : number) : Observable<any>{
    return this.http.post<any>(environment.backendHost+"type_vente/creer/"+idMarque, type_vente)
  }

  public getAllForMarque(idMarque : number) : Observable<any>{
    return this.http.get<any>(environment.backendHost+"type_vente/get/all/"+idMarque)
  }


  public getAllTypeVente() : Observable<any>{
    return this.http.get<any>(environment.backendHost+"type_vente/get/all")
  }

  public getTypeVente(id : number): Observable<any>{
    return this.http.get<any>(environment.backendHost+"type_vente/get/"+id)
  }

}
