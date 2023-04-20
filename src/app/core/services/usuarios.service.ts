import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmet } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http : HttpClient) { }
  url_servidor = environmet.servidor;
  valor_api = 'usuario';
  mostrar(){
    return this.http.get(`${this.url_servidor}/${this.valor_api}`);
  }

  mostrarByUser(datos : string){
    console.log("esta llegando al servicio", datos);
    console.log("url", `${this.url_servidor}/${this.valor_api}/${datos}`);
    
    return this.http.get(`${this.url_servidor}/${this.valor_api}/${datos}`);
  }

  guardar(datos : any){
    return this.http.post(`${this.url_servidor}/${this.valor_api}`, datos);
  }

  mostrarId(id : number){
    // se puede enviar el id por body utilizando post
    return this.http.get(`${this.url_servidor}/${this.valor_api}/${id}`);
  }

  actualizar(id : number, datos : any){
    return this.http.put(`${this.url_servidor}/${this.valor_api}/${id}`, datos);
  }

  eliminar(id : number){
    return this.http.delete(`${this.url_servidor}/${this.valor_api}/${id}`);
  }
}
