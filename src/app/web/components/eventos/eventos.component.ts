import { Component } from '@angular/core';
import { EventosService } from 'src/app/core/services/eventos.service';
import {direccion} from './../../../direccionArchivos/direcciones'
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent {
  direccionEventosImagen : any
  lista_eventos : any = [];
  constructor(private eventoService : EventosService){
    this.direccionEventosImagen = direccion.eventos
    this.eventoService.mostrar().subscribe(
      (res : any) => {
        this.lista_eventos = res;
        console.log(this.lista_eventos);
      },
      (error: any) => console.error(error)
    );
  }
}
