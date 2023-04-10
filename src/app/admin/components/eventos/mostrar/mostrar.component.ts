import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import {GuardarEditarComponent} from '../guardar-editar/guardar-editar.component'
@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit{
  lista_eventos: any = [];
  editar_evento : any = null;
  textoEnviado : any = null;
  constructor(private adminService: AdminService, private route : Router) {}

  ngOnInit(): void {
    this.mostrarEventos();
  }

 
  mostrarEventos() {
    this.adminService.listarGeneral('http://localhost:3000/api/evento').subscribe(
      (res: any) => {
        this.lista_eventos = Object.values(res)[0];
        console.log(this.lista_eventos);
      },
      (error: any) => console.error(error)
    );
  }

  adicionar(){
    this.route.navigate(['/admin/eventos/guardar-editar']);
  }
  

  eliminar(Datos : any){
    console.log(Datos);
    this.adminService.borrarUnDato(Datos).subscribe(
      (res: any) => {
        this.mostrarEventos();
      },
      (error: any) => console.error(error)
    );
  }


  
  editar(Datos : any){
    // console.log(Datos);
    // this.adminService.borrarUnDato(Datos).subscribe(
    //   (res: any) => {
    //     this.mostrarEventos();
    //   },
    //   (error: any) => console.error(error)
    // );
    if(Datos){
      this.textoEnviado.emit(Datos);
    }
    this.route.navigate(['/admin/eventos/guardar-editar']);
  
    
  }


}
