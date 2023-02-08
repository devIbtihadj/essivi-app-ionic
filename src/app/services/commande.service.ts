import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http : HttpClient) { }


  public getMyAllCommandesRegistred() : Observable<any>{
    return this.http.post<any>(environment.backendHost+"me", "")
  }


  public getAllCommandesNotDeliverd(): Observable<any>{
    return this.http.get<any>(environment.backendHost+"client/commandes/notdelivred")
  }



  public getCommande(id : number): Observable<any>{
    return this.http.get<any>(environment.backendHost+"client/commande/"+id)
  }

  public livrerCommande(idCml : number, idCde : number): Observable<any>{
    return this.http.post<any>(environment.backendHost+"livraison/creer/idCml/"+idCml+"/idCde/"+idCde, null)
  }



}
