import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ActividadEventoHasExpositorService } from 'src/app/core/services/actividad-evento-has-expositor.service';
import { ActividadEventoService } from 'src/app/core/services/actividad-evento.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ExpositoresService } from 'src/app/core/services/expositores.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { direccion } from 'src/app/direccionArchivos/direcciones';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss'],
})
export class ActividadesComponent implements OnInit {
  datosDelPadre: any = null;
  datosDelPadreActualizados = new Subject<any>();
  is_logued: any = '';

  visible_card: boolean = false;
  constructor(
    private actividadTieneExpositor: ActividadEventoHasExpositorService,
    private authService: AuthService,
    private router: ActivatedRoute,
    private usuarioService: UsuariosService,
    private actividadService: ActividadEventoService,
    private expositorService: ExpositoresService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.datosDelPadre = params.get('datosParaEnviar');
      this.datosDelPadreActualizados.next(this.datosDelPadre);
      this.getActividadEvent();
      this.is_logued = this.authService.getUser();
      // console.log('login', this.is_logued);
    });

    
  }

  
  generarPDF() {
  }

  lista_de_actividades: any = [];
  datos_expositor: any = {};
  getActividadEvent() {
    this.actividadService.mostrarId(this.datosDelPadre).subscribe(
      (res: any) => {
        this.lista_de_actividades = res;
        console.log(this.lista_de_actividades);
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
}
