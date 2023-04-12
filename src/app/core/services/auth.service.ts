import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environmet } from 'src/environments/environment';

// es una interface
interface usuario  {
  nom_usuario : string,
  contrasenia : string
}
interface usuarioRegistro {
  nombre : string,
  apellido : string,
  nom_usuario : string,
  contrasenia : string,
  correo : string
}


@Injectable({
  providedIn: 'root'
})

// var URL_LOCAL = 'http://localhost:3000'
export class AuthService {
  url_servidor = environmet.servidor;
  constructor(private http : HttpClient)  { }

  // aqui va a la API
  //en este caso los parametros son una interfaz
  loginConNode(data : usuario ){
    // la url del servicio
    return this.http.post(`${this.url_servidor}/auth/login`, data);
  }

  logout(){
  }
  registro(data : usuarioRegistro){
    return this.http.post(`${this.url_servidor}/auth/register`, data);
  }

  getPerfil(){
    return this.http.get(`${this.url_servidor}/auth/perfil`);
  }
}
