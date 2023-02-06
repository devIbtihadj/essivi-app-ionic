import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient) { }



  public getMyClients(): Observable<any>{
    return this.http.get<any>(environment.backendHost+"commercial/clients/all")
  }



}