import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environmet } from 'src/environments/environment';
import { BehaviorSubject, ignoreElements, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
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
  constructor(private http : HttpClient, private router : Router)  { }
  
  // aqui va a la API
  //en este caso los parametros son una interfaz

  
  loginConNode(data : usuario ){
    // la url del servicio
    const datos : any = this.http.post(`${this.url_servidor}/auth/login`, data).subscribe( (res : any) => {
      // console.log(res);
      
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('user', res.usuario);
      localStorage.setItem('rol_user', JSON.stringify(res.rol));
      this.router.navigate(['/admin']);
    }, (error : any) => {

    })
      
    return datos;
  }
  getUser(){
    let usuario_actual = localStorage.getItem('user');
    return usuario_actual;
  }

  isLoggedIn(): boolean {
    console.log("llamdno a is login");
    
    const token = localStorage.getItem('access_token');
    if (token) {
      const tokenPayload :any = jwt_decode(token);
      // console.log("login", tokenPayload);
      
      const now = new Date().getTime() / 1000;
      if (tokenPayload.exp  > now) {
        return true;
      }
    }
    return false;
  }
  getRol() : string[]{
    let aux : any 
    if(localStorage.getItem('rol_user')){
      const datos : any = localStorage.getItem('rol_user');
      aux = JSON.parse(datos);
      // console.log("roles mostrar ->", aux);
      
    }
    return aux; 
  }


  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('rol_user');
  }
  registro(data : usuarioRegistro){
    return this.http.post(`${this.url_servidor}/auth/register`, data);
  }

  registro_user(data : any){
    return this.http.post(`${this.url_servidor}/auth/register_user`, data);
  }

  actualizar(id : number, data : any){
    console.log("esta e authService ", id, data);
    return this.http.put(`${this.url_servidor}/auth/actualizar/${id}`, data);
  }

  getPerfil(){
    return this.http.get(`${this.url_servidor}/auth/perfil`);
  }
}
