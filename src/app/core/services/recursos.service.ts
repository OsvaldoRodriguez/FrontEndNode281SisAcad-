import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmet } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  constructor(private http : HttpClient) { }
  url_servidor = environmet.servidor;
  valor_api = 'recurso'
  mostrar(){
    return this.http.get(`${this.url_servidor}/${this.valor_api}`);
  }

  actualizarImagen(id : number, formData : any){
    return this.http.post(`${this.url_servidor}/${this.valor_api}/${id}/actualizar-imagen`, formData);
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
