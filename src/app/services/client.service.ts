import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ClientModel, clientModelClass } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient) { }



  public getMyClients(id : number): Observable<any>{
    return this.http.get<any>(environment.backendHost+"commercial/"+id+"/clients/all")
  }


  public addClient(id : number, client : clientModelClass): Observable<any>{
    return this.http.post<any>(environment.backendHost+"client/creer/comm/"+id, client)
  }


}
