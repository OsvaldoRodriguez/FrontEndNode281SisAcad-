import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmet } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialDeActividadService {
  constructor ( private http : HttpClient) { }
  url_servidor = environmet.servidor;
  valor_api = 'material_de_actividad'
  mostrar(){
    return this.http.get(`${this.url_servidor}/${this.valor_api}`);
  }

  actualizarImagen(id : number, formData : any){
    // console.log("esta entrando ");
    
    return this.http.post(`${this.url_servidor}/${this.valor_api}/${id}/actualizar-imagen`, formData);
  }

  guardar(datos : any){
    return this.http.post(`${this.url_servidor}/${this.valor_api}`, datos);
  }

  mostrarId(id : number, data : any){
    // se puede enviar el id por body utilizando post
    // console.log( "en el servicio", data);
    return this.http.get(`${this.url_servidor}/${this.valor_api}/${id}`, data);
    
    
  }

  mostrarIdByExpositor(id : number, data : any){
    // se puede enviar el id por body utilizando post
    // console.log( "en el servicio", data);
    return this.http.put(`${this.url_servidor}/${this.valor_api}_by_expositor/${id}`, data);
  }

  actualizar(id : number, datos : any){
    return this.http.put(`${this.url_servidor}/${this.valor_api}/${id}`, datos);
  }

  eliminar(id : number){
    // console.log("en el servicio", id, `${this.url_servidor}/${this.valor_api}/${id}`);
    // console.log("en el serciio", datos);
    
    return this.http.delete(`${this.url_servidor}/${this.valor_api}/${id}`);
  }
}
