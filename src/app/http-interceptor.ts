import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { SecurityService } from './services/security.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor{


    constructor(private securityService : SecurityService, private router : Router){

    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(req.headers.get('No-Auth') === 'True'){
            return next.handle(req.clone());
        }


        const myToken = this.securityService.getToken()

        req = req.clone({
          setHeaders : {
              'x-access-token' : ''+myToken
          }
      })


        return next.handle(req).pipe(
            catchError(
                (err : HttpErrorResponse)=>{
                    console.log("err intercept http "+err.message)
                    console.log(err.status);
                    if(err.status == 401){
                        //this.toastr.error("Votre compte est momentanément inactif, Veuillez contacter un admin pour l'activation", 'Echec')
                        this.router.navigate(['/login'])
                    }else {
                        if(err.status == 403){
                            //FORBIDEN NORMALEMENT
                            this.router.navigate(['/forbiden'])
                        }
                    }
                    return throwError ("Something went wrong ");
                }
            )
        )


        //throw new Error('Method not implemented.');
    }

}
