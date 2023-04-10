import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

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

  constructor(private http : HttpClient)  { }

  // aqui va a la API
  //en este caso los parametros son una interfaz
  loginConNode(data : usuario ){
    // la url del servicio
    return this.http.post(`http://127.0.0.1:3000/api/auth/login`, data);
  }

  logout(){
  }
  registro(data : usuarioRegistro){
    return this.http.post('http://127.0.0.1:3000/api/auth/register', data);
  }

  getPerfil(){
    return this.http.get('http://127.0.0.1:3000/api/auth/perfil');
  }
}
