import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// para el paso  de parametros
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ActividadEventoService } from 'src/app/core/services/actividad-evento.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { EventosService } from 'src/app/core/services/eventos.service';
import { ExpositoresService } from 'src/app/core/services/expositores.service';
import { InstitucionService } from 'src/app/core/services/institucion.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss'],
})
export class ActividadesComponent implements OnInit {
  // recuprando los datos por url
  datosDelPadre: any = null;
  datosDelPadreActualizados = new Subject<any>();

  // constructor(private route: ActivatedRoute) {}
  lista_actividades: any = [];
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private route: Router,
    private router: ActivatedRoute,
    private actividadEventoService: ActividadEventoService,
    private categoriaService: CategoriasService,
    private expositoresService: ExpositoresService
  ) {}
  lista_de_categorias: any = [];
  lista_de_expositores: any = [];
  select_id = 0; // para saber si es editar

  actividadForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    horario_ini: new FormControl('', [Validators.required]),
    horario_fin: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    EventoId: new FormControl('', [Validators.required]),
    ExpositorId: new FormControl('', [Validators.required]),
  });
  volver() {
    this.route.navigate(['/admin/eventos/mostrar']);
  }
  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.datosDelPadre = params.get('datosParaEnviar');
      this.datosDelPadreActualizados.next(this.datosDelPadre);
      this.mostrarActividades();
      this.mostrarCategorias();
      this.showExpositores();

      this.actividadForm = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        fecha: new FormControl('', [Validators.required]),
        horario_ini: new FormControl('', [Validators.required]),
        horario_fin: new FormControl('', [Validators.required]),
        CategoriaId: new FormControl('', [Validators.required]),
        EventoId: new FormControl(this.datosDelPadre, [Validators.required]),
        ExpositorId: new FormControl('', [Validators.required]),
      });
    });

    // console.log("en el hijo", this.datosDelPadre);
  }

  showExpositores() {
    this.expositoresService.mostrar().subscribe(
      (res: any) => {
        this.lista_de_expositores = res;
        console.log(this.lista_de_expositores);
      },
      (error: any) => {}
    );
  }

  // los que se aumento

  tienePermisos(permisos: string[]): boolean {
    let permisos_permitidos = permisos;
    const usuario_actual: string[] = this.authService.getRol();
    return permisos_permitidos.some((r: string) => usuario_actual.includes(r));
  }
  // para compartir
  mostrarActividades() {
    this.actividadEventoService.mostrarId(this.datosDelPadre).subscribe(
      (res: any) => {
        this.lista_actividades = res;
        // console.log("traenco act", this.lista_actividades);
        
      },
      (error: any) => console.error(error)
    );
  }

  mostrarCategorias() {
    this.categoriaService.mostrar().subscribe(
      (res: any) => {
        this.lista_de_categorias = res;
      },
      (error: any) => console.error(error)
    );
  }

  eliminar(Datos: any) {
    console.log(Datos);
    this.actividadEventoService.eliminar(Datos).subscribe(
      (res: any) => {
        this.mostrarActividades();
        const msg = 'Actividad Eliminado';
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: msg,
        });
        this.select_id = 0;
      },
      (error: any) => {
        const msg = 'Error al Eliminar';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: msg,
        });
      }
    );
  }
  selectedInstitucion: any;

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.actividadForm.reset();
    this.select_id = 0;
    this.actividadForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      horario_ini: new FormControl('', [Validators.required]),
      horario_fin: new FormControl('', [Validators.required]),
      CategoriaId: new FormControl('', [Validators.required]),
      EventoId: new FormControl(this.datosDelPadre, [Validators.required]),
      ExpositorId: new FormControl('', [Validators.required]),
    });
  }

  cancelar() {
    this.hideDialog();
    this.actividadForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      horario_ini: new FormControl('', [Validators.required]),
      horario_fin: new FormControl('', [Validators.required]),
      CategoriaId: new FormControl('', [Validators.required]),
      EventoId: new FormControl(this.datosDelPadre, [Validators.required]),
      ExpositorId: new FormControl('', [Validators.required]),
    });
  }

  editar(datos: any) {
    this.select_id = datos.id;
    this.actividadForm.patchValue(datos);
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
      this.actividadEventoService
        .actualizar(this.select_id, this.actividadForm.value)
        .subscribe((res: any) => {
          const msg = 'Actividad Actualizado';
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizdo',
            detail: msg,
          });
          this.hideDialog();
          this.mostrarActividades();
        });
    } else {
      this.actividadEventoService.guardar(this.actividadForm.value).subscribe(
        (res: any) => {
          const msg = 'Actividad Añadido';
          this.messageService.add({
            severity: 'success',
            summary: 'Añadido',
            detail: msg,
          });
          this.hideDialog();
          this.mostrarActividades();
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
