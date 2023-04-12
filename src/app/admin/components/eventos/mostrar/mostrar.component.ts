import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  SimpleChange,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/core/services/admin.service';
import { EventosService } from 'src/app/core/services/eventos.service';
import { InstitucionService } from 'src/app/core/services/institucion.service';
@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss'],
})
export class MostrarComponent implements OnInit {
  lista_eventos: any = [];
  constructor(
    private messageService: MessageService,
    private eventosService: EventosService,
    private route: Router,
    private institucionService: InstitucionService
  ) {}

  ngOnInit(): void {
    this.mostrarEventos();
    this.mostrarInstituciones();
  }

  lista_de_instituciones: any = [];
  select_id = 0; // para saber si es editar
  eventoForm: FormGroup = new FormGroup({
    nombre_Evento: new FormControl('', [Validators.required]),
    fecha_ini: new FormControl('', [Validators.required]),
    fecha_fin: new FormControl('', [Validators.required]),
    logo: new FormControl(''),
    InstitucionId: new FormControl(0, [Validators.required]),
  });
  // para compartir
  mostrarEventos() {
    this.eventosService.mostrar().subscribe(
      (res: any) => {
        this.lista_eventos = res;
        console.log(this.lista_eventos);
      },
      (error: any) => console.error(error)
    );
  }

  adicionar() {
    this.route.navigate(['/admin/eventos/guardar-editar']);
  }

  eliminar(Datos: any) {
    console.log(Datos);
    this.eventosService.eliminar(Datos).subscribe(
      (res: any) => {
        this.mostrarEventos();
      },
      (error: any) => console.error(error)
    );
  }
  selectedInstitucion: any;

  visible: boolean = false;

  showDialog() {
    this.mostrarInstituciones();
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.eventoForm.reset();
    this.select_id = 0;
  }

  mostrarInstituciones() {
    this.institucionService.mostrar().subscribe(
      (res: any) => {
        this.lista_de_instituciones = res;
        console.log(this.lista_de_instituciones);
      },
      (error: any) => console.error(error)
    );
  }

  cancelar() {
    this.hideDialog();
  }

  editar(datos: any) {
    this.select_id = datos.id;
    console.log(this.select_id, 'llega');

    this.eventoForm.patchValue(datos);
    this.showDialog();
    // le envio lo que estoy agarrando
    // this.adminService.datos_compartidos_funcion(datos);
    // this.route.navigate(['/admin/eventos/guardar-editar']);
  }
  guardarEditar() {
    if (this.select_id > 0) {
      // hayq eu editar
      // this.servicio.actualizar()
      console.log('entra a editar');

      this.eventosService
        .actualizar(this.select_id, this.eventoForm.value)
        .subscribe((res: any) => {
          const msg = 'Evento Actualizado';
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizdo',
            detail: msg,
          });
          this.hideDialog();
          this.mostrarEventos();
        });
    } else {
      this.eventosService.guardar(this.eventoForm.value).subscribe(
        (res: any) => {
          const msg = 'Evento Añadido';
          this.messageService.add({
            severity: 'success',
            summary: 'Añadido',
            detail: msg,
          });
          this.hideDialog();
          this.mostrarEventos();
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Evento no añadido',
          });
        }
      );
    }
  }
}
