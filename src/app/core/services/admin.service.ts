import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// es una interface
interface usuario {
  nom_usuario: string;
  contrasenia: string;
}

@Injectable({
  providedIn: 'root',
})

// var URL_LOCAL = 'http://localhost:3000'
export class AdminService {
  constructor(private http: HttpClient) {}

  //en este caso los parametros son una interfaz
  go(data: usuario) {
    // la url del servicio
    return this.http.post(`http://localhost:3000/api/auth/perfil`, data);
  }

  listarEventos() {
    return this.http.get('http://localhost:3000/api/evento');
  }

  listarGeneral(ruta : string) {
    return this.http.get(ruta);
  }

  listarInstitucion() {
    return this.http.get('http://localhost:3000/api/institucion');
  }

  listarUsuarios() {
    return this.http.get('http://localhost:3000/api/usuario');
  }

  guardarEditarEvento(data: any, edicion_evento: any) {
    console.log('cuando quiere guardar ', edicion_evento);
    if (edicion_evento)
      // hay que editar
      return this.http.put(
        `http://localhost:3000/api/evento/${edicion_evento.id}`,
        data
      );
    return this.http.post('http://localhost:3000/api/evento', data);
  }

  guardarEditarInstitucion(data: any, edicion_evento: any) {
    console.log('cuando quiere guardar ', edicion_evento);
    if (edicion_evento)
      // hay que editar
      return this.http.put(
        `http://localhost:3000/api/institucion/${edicion_evento.id}`,
        data
      );
    return this.http.post('http://localhost:3000/api/institucion', data);
  }

  borrarUnDato(id: any) {
    console.log('llega el datos', id);
    return this.http.delete(`http://localhost:3000/api/evento/${id}`);
  }

  // para todos
  borrarUnDatoGeneral(ruta : string, id: any) {
    console.log('llega el datos', id);
    return this.http.delete(`${ruta}/${id}`);
  }
}
