import { Component } from '@angular/core';
import { EventosService } from 'src/app/core/services/eventos.service';
import {direccion} from './../../../direccionArchivos/direcciones'
import { Router } from '@angular/router';
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent {
  direccionEventosImagen : any
  datosParaEnviar : any
  lista_eventos : any = [];
  constructor(private route : Router, private eventoService : EventosService){
    this.direccionEventosImagen = direccion.eventos
    this.eventoService.mostrar().subscribe(
      (res : any) => {
        this.lista_eventos = res;
        console.log(this.lista_eventos);
      },
      (error: any) => console.error(error)
    );
  }

  navegarHaciaHijo(id: any) {
    this.datosParaEnviar = id;
    this.route.navigate(['/web/actividadesWeb', this.datosParaEnviar]);
    console.log("se esta volivendo");
    
  }

}
