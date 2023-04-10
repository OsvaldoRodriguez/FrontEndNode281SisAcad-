import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  lista_institucion: any = [];
  editar_evento : any = null;
  textoEnviado : any = null;
  constructor(private adminService: AdminService, private route : Router) {}

  ngOnInit(): void {
    this.mostrarInstitucion();
  }

 
  mostrarInstitucion() {
    this.adminService.listarInstitucion().subscribe(
      (res: any) => {
        this.lista_institucion = Object.values(res)[0];
        console.log(this.lista_institucion);
      },
      (error: any) => console.error(error)
    );
  }

  adicionar(){
    this.route.navigate(['/admin/instituciones/guardar-editar']);
  }
  

  eliminar(Datos : any){
    console.log(Datos);
    this.adminService.borrarUnDatoGeneral("http://localhost:3000/api/institucion", Datos).subscribe(
      (res: any) => {
        this.mostrarInstitucion();
      },
      (error: any) => console.error(error)
    );
  }


  
  editar(Datos : any){
    
    
  }

}
