import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

// es una interface
interface usuario  {
  nom_usuario : string,
  contrasenia : string
}


@Injectable({
  providedIn: 'root'
})

// var URL_LOCAL = 'http://localhost:3000'
export class AdminService {

  constructor(private http : HttpClient) { }


  //en este caso los parametros son una interfaz
  go(data : usuario ){
    // la url del servicio
    return this.http.post(`http://localhost:3000/api/auth/perfil`, data);
  }
}
