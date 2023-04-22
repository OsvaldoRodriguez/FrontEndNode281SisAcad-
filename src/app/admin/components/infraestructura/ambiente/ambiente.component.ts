import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventosService } from 'src/app/core/services/eventos.service';
import { InstitucionService } from 'src/app/core/services/institucion.service';
import { direccion } from 'src/app/direccionArchivos/direcciones';

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html',
  styleUrls: ['./ambiente.component.scss']
})
export class AmbienteComponent implements OnInit {
  direccionEventosImagen : any = "";
  lista_eventos: any = [];
  eventos: any;
  datosParaEnviar: any = 'enviando del padres';
  //imagen
  displayModalImage: boolean = false;
  uploadedFiles: any[] = [];
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private eventosService: EventosService,
    private route: Router,
    private institucionService: InstitucionService
  ) {
    // ActividadesComponent.datosDelPadreActualizados.subscribe(datos => {
    //   this.datosDelHijo = datos;
    // });
    this.direccionEventosImagen = direccion.eventos;
  }
  navegarHaciaHijo(id: any) {
    this.datosParaEnviar = id;
    this.route.navigate(['/admin/infraestructura/actividades', this.datosParaEnviar]);
  }

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
    // logo: new FormControl(''),
    InstitucionId: new FormControl(0, [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });

  activied_eventoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    logo: new FormControl(''),
    InstitucionId: new FormControl(0, [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });

  // para las imagenes
  showModalDialogImage(eventos: any) {
    this.eventos = { ...eventos }; //recuperando evento (solo el seleccionado)
    this.displayModalImage = true;
  }

  myUploader(event?: any) {
    //event.files == files to upload
    console.log(event.files);
    // hasta ahora ya se tiene la imagen en memoria
    // subiedno por formularios de data
    let formData = new FormData();
    formData.append('imagen', event.files[0]); // porque solo es una imagen

    this.eventosService.actualizarImagen(this.eventos.id, formData).subscribe(
      (res: any) => {
        this.displayModalImage = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Imagen Actualizada',
          detail: '',
        });
        this.mostrarEventos();
      },
      (error: any) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Error al Actualizar Imagen',
          detail: '',
        });
      }
    );
  }

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
        // console.log('Instituciones', this.lista_de_instituciones);
      },
      (error: any) => console.error(error)
    );
  }

  cancelar() {
    this.hideDialog();
  }

  editar(datos: any) {
    this.select_id = datos.id;
    console.log(datos);
    this.eventoForm.patchValue(datos);
    this.showDialog();
  }

  adicionarActividad(id: any) {
    // console.log("esta lleganod");
    this.select_id = id;
    console.log(this.select_id);
    // this.route.navigate(['/admin/eventos/actividades']);
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
