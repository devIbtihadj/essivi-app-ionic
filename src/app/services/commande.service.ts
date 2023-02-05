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

}
