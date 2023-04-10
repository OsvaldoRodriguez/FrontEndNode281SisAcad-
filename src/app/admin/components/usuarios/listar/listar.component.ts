import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  lista_usuarios : any = [];
  constructor(private adminService : AdminService, private route : Router){}
  ngOnInit(): void {
    this.mostrarUsuarios();
  }

  mostrarUsuarios() {
    this.adminService.listarUsuarios().subscribe(
      (res: any) => {
        console.log(res);
        this.lista_usuarios = Object.values(res)[0];
        console.log(this.lista_usuarios);
      },
      (error: any) => console.error(error)
    );
  }

  editar(datos  : any){

  }
  adicionar(){
    this.route.navigate(['/admin/usuarios/agregar']);
  }
  

  eliminar(Datos : any){
    console.log(Datos);
    this.adminService.borrarUnDato(Datos).subscribe(
      (res: any) => {
        this.mostrarUsuarios();
      },
      (error: any) => console.error(error)
    );
  }
}
