import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmet } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfosistemaService {

  constructor(private http: HttpClient) { }
  url_servidor = environmet.servidor;
  valor_api = 'infosistema'
  guardar(datos : any){
    return this.http.post(`${this.url_servidor}/${this.valor_api}`, datos);
  }

  mostrar(){
    return this.http.get(`${this.url_servidor}/${this.valor_api}`);
  }

  actualizarImagen(id : number, formData : any){
    return this.http.post(`${this.url_servidor}/${this.valor_api}/${id}/actualizar-imagen`, formData);
  }

  mostrarId(id : number){
    // se puede enviar el id por body utilizando post
    return this.http.get(`${this.url_servidor}/${this.valor_api}/${id}`);
  }



}
