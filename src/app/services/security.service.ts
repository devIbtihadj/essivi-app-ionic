import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Login } from '../pages/login/login.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  requestHeader = new HttpHeaders(
    { "No-Auth" : "True"}
  );

  private _storage: Storage | null = null;

  constructor(private http : HttpClient, private storage : Storage) {
    this.init()
  }
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public setUtilisateurId(id : string){
    this.storage.set('commercial_id', id)
  }

  public async  getUtilisateurId() : Promise<string>{
    return await this.storage.get('commercial_id');
  }


  public setToken(jwtToken : string){
    this.storage.set('token', jwtToken)
  }

  public async  getToken() : Promise<string>{
    return await this.storage.get('token');
  }


  public async clear(){
    await this.storage.clear();
  }


  public isLoggedIn(){
    return this.getToken();
  }

  public me(id : number) : Observable<any>{
    return this.http.post<any>(environment.backendHost+"auth/me/"+id, "")
  }


  login(loginM : Login) : Observable<any>{
    return this.http.post<any>(environment.backendHost+"auth/login", loginM, {headers : this.requestHeader})

  }

}
