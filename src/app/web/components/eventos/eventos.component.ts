import { Component } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent {
  lista_eventos : any = [];
  constructor(private adminService : AdminService){
    this.adminService.listarEventos().subscribe(

      (res : any) => {
        this.lista_eventos = Object.values(res)[0];
        console.log(this.lista_eventos);
      },
      (error: any) => console.error(error)
    );
  }
}
