import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class PeticionInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // aqui hay que interceptar la peticion 
    // validar cosas  y demas
    // este es el token proporcionado al usario al iniciar sesion
    // console.log("llega a interceptar");
    const token = localStorage.getItem('access_token');
    // console.log("interceptor", token);
    
    // cualquier peticion se envia con  el token
    const peticion = request.clone({
      setHeaders :{
        'Accept': 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    });

    
    return next.handle(peticion).pipe( tap( () => {},
      (error  : any) => {
        if(error instanceof HttpErrorResponse){
          // tiene que ser !== estricto
          if(error.status !== 401){
            return;
          }

          // entonces puede que el token haya vencido y lo eliminamos

          // localStorage.removeItem('access_token');
          // si las credenciales  son incorrectas entonces no deja pasar y vuelve a login
          // console.log("esta llegando ahsta aqui");
          
          this.router.navigate(['/auth/login']);
        }
      }
    ));
  }
}
