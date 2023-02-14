import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {


  constructor(private securityService : SecurityService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



      this.securityService.getToken().then((token)=>{

        if (token==null){
          this.router.navigate(['/login'])
        }
      },
      ).catch((err)=>{
        alert('err')
        this.router.navigate(['/login'])
        return false;
      })


      return true;


      /*if(this.securityService.getToken() != null){
        return true
      }else{
        this.router.navigate(['/login'])
        return false;
      }*/


  }

}
