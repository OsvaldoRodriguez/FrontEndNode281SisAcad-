import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ActividadEventoHasExpositorService } from 'src/app/core/services/actividad-evento-has-expositor.service';
import { ActividadEventoService } from 'src/app/core/services/actividad-evento.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ExpositoresService } from 'src/app/core/services/expositores.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { direccion } from 'src/app/direccionArchivos/direcciones';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioComentaEventoService } from 'src/app/core/services/usuario-comenta-evento.service';
import { EventosService } from 'src/app/core/services/eventos.service';
import { UsuarioSeInscribeEventoService } from 'src/app/core/services/usuario-se-inscribe-evento.service';
import { UsuarioReservaEventoService } from 'src/app/core/services/usuario-reserva-evento.service';
import { MaterialDeActividadService } from 'src/app/core/services/material-de-actividad.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss'],
})
export class ActividadesComponent implements OnInit {
  datosDelPadre: any = null;
  datosDelPadreActualizados = new Subject<any>();
  is_logued: any = '';
  usuario_id: any;
  usuario_foto: any;
  datos_evento: any;
  lista_de_comentarios: any = [];
  comentarioForm: FormGroup = new FormGroup({
    UsuarioId: new FormControl('', [Validators.required]),
    EventoId: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    fecha_hora: new FormControl(new Date(), [Validators.required]),
  });

  usuario_inscrito: boolean = false;
  text_usuario_inscrito: string = 'Inscribirse';

  datosParaEnviar: any;

  usuario_reserva: boolean = false;
  text_usuario_reserva: string = 'Reservar';

  visible_card: boolean = false;
  constructor(
    private http : HttpClient,
    private materialActividadService: MaterialDeActividadService,
    private reservaService: UsuarioReservaEventoService,
    private actividadTieneExpositor: ActividadEventoHasExpositorService,
    private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
    private usuarioService: UsuariosService,
    private actividadService: ActividadEventoService,
    private expositorService: ExpositoresService,
    private usuarioComentaEvento: UsuarioComentaEventoService,
    private eventoService: EventosService,
    private inscribirseService: UsuarioSeInscribeEventoService
  ) {}
  url_imagen: any;
  url_imagen_evento: any;

  displayModalImage: boolean = false;
  eventos: any;
  url_imagenMaterial: any;
  lista_de_material: any = [];
  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.datosDelPadre = params.get('datosParaEnviar');
      this.datosDelPadreActualizados.next(this.datosDelPadre);
    });
    this.url_imagenMaterial = direccion.material_expositor;
    this.url_imagen = direccion.usuarios;
    this.getUserActual();
    this.getComentarios(this.datosDelPadre);
    this.getActividadEvent();
    this.getEvento(this.datosDelPadre);
    this.is_logued = this.authService.getUser();
  }

  getEvento(id: number) {
    // console.log("id evento", id);

    this.eventoService.mostrarId(id).subscribe(
      (res: any) => {
        // console.log(res);

        this.datos_evento = Object(res[0]);
        // console.log(this.datos_evento);

        this.url_imagen_evento = direccion.eventos + this.datos_evento.logo;
      },
      (error: any) => {}
    );
  }
  getUserActual() {
    this.usuarioService.mostrar().subscribe(
      (res: any) => {
        // console.log("usuarios", res);
        for (let i = 0; i < res.length; i++) {
          if (res[i].nom_usuario === this.is_logued) {
            this.usuario_id = res[i];
            this.comentarioForm = new FormGroup({
              UsuarioId: new FormControl(this.usuario_id.id, [
                Validators.required,
              ]),
              EventoId: new FormControl(this.datosDelPadre, [
                Validators.required,
              ]),
              descripcion: new FormControl('', [Validators.required]),
              fecha_hora: new FormControl(new Date(), [Validators.required]),
            });
          }
        }
      },
      (error: any) => {}
    );
  }

  generarPDF() {}

  lista_de_actividades: any = [];
  datos_expositor: any = {};
  getActividadEvent() {
    this.actividadService.mostrarId(this.datosDelPadre).subscribe(
      (res: any) => {
        this.lista_de_actividades = res;
        // console.log(this.lista_de_actividades);
      },
      (error: any) => {}
    );
  }

  expositor(datos: any) {
    this.actividadTieneExpositor.mostrar().subscribe(
      (res: any) => {
        // console.log('actividades por expositor', res);
        for (let i = 0; i < res.length; i++) {
          if (datos.id === res[i].Actividad_EventoId) {
            // console.log('es el expositor', res[i].ExpositorId);
            this.buscandoUser(res[i].ExpositorId);
            this.visible_card = true;
          }
        }
      },
      (error: any) => {}
    );
  }

  buscandoUser(idExpositor: number) {
    this.usuarioService.mostrar().subscribe(
      (res: any) => {
        // console.log("usuarios", res);
        for (let i = 0; i < res.length; i++) {
          if (idExpositor === res[i].id) {
            this.datos_expositor.nombre = res[i].Persona.nombre;
            this.datos_expositor.paterno = res[i].Persona.paterno;
            this.datos_expositor.materno = res[i].Persona.materno;
            this.datos_expositor.sexo = res[i].Persona.sexo;
            this.datos_expositor.descripcion = res[i].Rols.descripcion;
            this.datos_expositor.foto = res[i].foto;
            this.datos_expositor.correo = res[i].correo;
          }

          if (res[i].nom_usuario === this.is_logued) {
            this.usuario_id = res[i].id;
          }
        }

        this.FindExpositor(idExpositor);
      },
      (error: any) => {}
    );
  }

  FindExpositor(id: number) {
    this.expositorService.mostrar().subscribe(
      (res: any) => {
        // console.log("expositor", res);
        for (let i = 0; i < res.length; i++) {
          if (res[i].UsuarioId === id) {
            this.datos_expositor.experiencia_academica =
              res[i].experiencia_academica;
            this.datos_expositor.direccionImagen =
              direccion.usuarios + this.datos_expositor.foto;
          }
        }

        // aqui ya se tiene todo mostrando en el form
        // console.log("mostrando datos expo", this.datos_expositor);
      },
      (error: any) => {}
    );
  }

  calcularTiempo(fecha: Date): string {
    let now = new Date();
    let date = fecha;
    let diff = (now.getTime() - date.getTime()) / 1000; // Diferencia de tiempo en segundos
    // console.log("cambiando", diff);

    if (diff < 60) {
      return 'hace menos de un minuto';
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `hace ${minutes} ${minutes > 1 ? 'minutos' : 'minuto'}`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `hace ${hours} ${hours > 1 ? 'horas' : 'hora'}`;
    } else {
      const days = Math.floor(diff / 86400);
      return `hace ${days} ${days > 1 ? 'días' : 'día'}`;
    }
  }
  diferencia(fecha: Date): number {
    let now = new Date();
    let date = fecha;
    let diff = (now.getTime() - date.getTime()) / 1000; // Diferencia de tiempo en segundos
    // console.log("cambiando", diff);
    return diff;
  }

  getComentarios(id: number) {
    this.usuarioComentaEvento.mostrarId(id).subscribe(
      (res: any) => {
        // console.log("comentario", res);
        for (let i = 0; i < res.length; i++) {
          let fechita: Date;
          this.getDatosPersona({
            id: res[i].UsuarioId,
            descripcion: res[i].descripcion,
            fecha_hora: this.calcularTiempo(new Date(res[i].fecha_hora)),
            diferencia: this.diferencia(new Date(res[i].fecha_hora)),
          });
        }
      },
      (error: any) => {}
    );
  }

  getDatosPersona(datos: any) {
    // console.log("datidos", datos);

    this.usuarioService.mostrarId(datos.id).subscribe(
      (res: any) => {
        // console.log("usuariot", res);
        datos.nombre = res[0].Persona.nombre;
        datos.apellido = res[0].Persona.paterno;
        datos.foto = res[0].foto;
        this.lista_de_comentarios.push(datos);
        this.lista_de_comentarios.sort((a: any, b: any) => {
          return a.diferencia - b.diferencia;
        });
        // console.log("LISTA DE COMENTARIOS");
        // console.log(this.lista_de_comentarios);
      },
      (error: any) => {}
    );
  }

  inscribirse(dato: any) {
    // console.log('datos', dato);
    // console.log("evento", this.datosDelPadre);
    // console.log('usuario ', this.usuario_id);
    // primer automaticamente se inscribe en evento
    this.usuario_inscrito = true;
    this.text_usuario_inscrito = 'Inscrito';
    this.inscribirseService
      .guardar({
        EventoId: this.datosDelPadre,
        UsuarioId: this.usuario_id.id,
        fecha_hora: new Date(),
      })
      .subscribe(
        (res: any) => {},
        (error: any) => {}
      );

    // this.inscribirseService.guardar({  } ).subscribe()
  }

  reservar(dato: any) {
    // console.log('datos', dato);
    // console.log("evento", this.datosDelPadre);
    // console.log('usuario ', this.usuario_id);
    // primer automaticamente se inscribe en evento
    this.usuario_reserva = true;
    this.text_usuario_reserva = 'Reservado';
    this.reservaService
      .guardar({
        EventoId: this.datosDelPadre,
        UsuarioId: this.usuario_id.id,
        fecha_hora: new Date(),
      })
      .subscribe(
        (res: any) => {},
        (error: any) => {}
      );

    // this.inscribirseService.guardar({  } ).subscribe()
  }

  enviarComentario() {
    this.usuarioComentaEvento.guardar(this.comentarioForm.value).subscribe(
      (res: any) => {},
      (error: any) => {
        location.reload();
        this.comentarioForm.reset();
        this.comentarioForm = new FormGroup({
          UsuarioId: new FormControl(this.usuario_id.id, [Validators.required]),
          EventoId: new FormControl(this.datosDelPadre, [Validators.required]),
          descripcion: new FormControl('', [Validators.required]),
          fecha_hora: new FormControl(new Date(), [Validators.required]),
        });
      }
    );
  }

  navegarHaciaHijo(id: any) {
    console.log('hola seuq');

    this.datosParaEnviar = id;
    // this.route.navigate(['/web/materialWeb'])
    this.route.navigate(['/web/materialWeb', this.datosParaEnviar]);
  }

  showModalDialogImage(eventos: any) {
    this.eventos = { ...eventos }; //recuperando evento (solo el seleccionado)
    console.log('datitos', this.eventos);
    // console.log("current user", this.current_user);
    this.displayModalImage = true;
    this.mostrarMaterial(this.eventos.id);
  }
  mostrarMaterial(id: number) {
    this.lista_de_material = []
    this.materialActividadService.mostrar().subscribe(
      (res: any) => {
        // console.log("tranedo todod", res);
        
        for (let i = 0; i < res.length; i++) {
          if (res[i].Actividad_EventoId === id) {
            this.lista_de_material.push({
              nombre_archivo: res[i].nombre_archivo,
            });
          }
        }
        // console.log("total resultado", this.lista_de_material);
      },
      (error: any) => {}
    );
  }

  descargar(fileName: any) {
    const url = `${this.url_imagenMaterial}${fileName}`; // Reemplaza esto con la ubicación real del archivo en el servidor
    this.http.get(url, { responseType: 'blob' }).subscribe((data) => {
      const blob = new Blob([data], { type: data.type });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(downloadUrl);
    });
  }
}
