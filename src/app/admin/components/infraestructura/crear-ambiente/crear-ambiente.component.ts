import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InstitucionService } from 'src/app/core/services/institucion.service';

@Component({
  selector: 'app-crear-ambiente',
  templateUrl: './crear-ambiente.component.html',
  styleUrls: ['./crear-ambiente.component.scss']
})
export class CrearAmbienteComponent {
  lista_institucion: any = [];
  editar_evento: any = null;
  textoEnviado: any = null;
  constructor(
    private institucionService: InstitucionService,
    private route: Router,
    private messageService: MessageService
  ) {}
    // para enviar al hijo
    datosParaEnviar: any = 'enviando del padres';

  institucionForm: FormGroup = new FormGroup({
    nombre_institucion: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required]),
    fecha_fin: new FormControl('', [Validators.required]),
    logo: new FormControl(''),
    celular: new FormControl(''),
    correo: new FormControl(''),
  });

  ngOnInit(): void {
    this.mostrarInstitucion();
  }

  select_id: number = 0;
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  navegarHaciaHijo(id: any) {
    this.datosParaEnviar = id;
    this.route.navigate(['/admin/infraestructura/ambientes', this.datosParaEnviar]);
  }
  hideDialog() {
    this.visible = false;
    this.institucionForm.reset();
    this.select_id = 0;
  }

  cancelar() {
    this.institucionForm.reset();
    this.hideDialog();
    this.select_id = 0;
  }
  guardarEditar() {
    if (this.select_id > 0) {
      this.institucionService
        .actualizar(this.select_id, this.institucionForm.value)
        .subscribe(
          (res: any) => {
            const msg = 'Institucion Actualizado';
            this.messageService.add({
              severity: 'success',
              summary: 'Actualizado',
              detail: msg,
            });
            this.hideDialog();
            this.mostrarInstitucion();
          },
          (error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Institucion no añadido',
            });
          }
        );
    } else {
      this.institucionService.guardar(this.institucionForm.value).subscribe(
        (res: any) => {
          const msg = 'Institución Añadido';
          this.messageService.add({
            severity: 'success',
            summary: 'Añadido',
            detail: msg,
          });
          this.hideDialog();
          this.mostrarInstitucion();
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Institucion no añadido',
          });
        }
      );
    }
  }

  mostrarInstitucion() {
    this.institucionService.mostrar().subscribe(
      (res: any) => {
        this.lista_institucion = res;
        console.log(this.lista_institucion);
      },
      (error: any) => console.error(error)
    );
  }

  adicionar() {
    this.showDialog();
  }

  eliminar(Datos: any) {
    console.log(Datos);
    this.institucionService.eliminar(Datos).subscribe(
      (res: any) => {
        this.mostrarInstitucion();
      },
      (error: any) => console.error(error)
    );
  }

  editar(Datos: any) {
    this.select_id = Datos.id;
    this.institucionForm.patchValue(Datos);
    this.showDialog();
  }
}
