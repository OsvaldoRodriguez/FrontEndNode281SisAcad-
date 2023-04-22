import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ActividadEventoSolicitaAmbienteService } from 'src/app/core/services/actividad-evento-solicita-ambiente.service';
import { ActividadEventoService } from 'src/app/core/services/actividad-evento.service';
import { AmbientesService } from 'src/app/core/services/ambientes.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { EventosService } from 'src/app/core/services/eventos.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss'],
})
export class ActividadesComponent {
  // recuprando los datos por url
  datosDelPadre: any = null;
  datosDelPadreActualizados = new Subject<any>();

  // constructor(private route: ActivatedRoute) {}
  lista_actividades: any = [];
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private eventosService: EventosService,
    private route: Router,
    private router: ActivatedRoute,
    private actividadEventoService: ActividadEventoService,
    private categoriaService: CategoriasService,
    private ambienteService: AmbientesService,
    private actividadEventoSolicitaAmbienteService :ActividadEventoSolicitaAmbienteService 
  ) {
    console.log("datos del apdre", this.datosDelPadre);
    
  }
  lista_ambientes : any
 

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  lista_de_categorias: any = [];
  select_id = 0; // para saber si es editar

  ambienteForm : FormGroup = new FormGroup({
    AmbienteId : new FormControl('', [Validators.required]),
    Actividad_EventoId : new FormControl('', [Validators.required])
  })

  actividadForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    horario_ini: new FormControl('', [Validators.required]),
    horario_fin: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    EventoId: new FormControl('', [Validators.required]),
  });
  volver() {
    this.route.navigate(['/admin/infraestructura/ambiente']);
  }
  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.datosDelPadre = params.get('datosParaEnviar');
      console.log("datitos del padres", this.datosDelPadre);
      
      this.datosDelPadreActualizados.next(this.datosDelPadre);
      this.mostrarActividades();
      this.mostrarAmbientes();
      // this.mostrarCategorias();

      this.actividadForm = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        fecha: new FormControl('', [Validators.required]),
        horario_ini: new FormControl('', [Validators.required]),
        horario_fin: new FormControl('', [Validators.required]),
        CategoriaId: new FormControl('', [Validators.required]),
        EventoId: new FormControl(this.datosDelPadre, [Validators.required]),
      });
    });

    // console.log("en el hijo", this.datosDelPadre);
  }

  mostrarAmbientes(){

    this.eventosService.mostrarId(this.datosDelPadre).subscribe( (res : any) => {
      // console.log("datos del evento", res[0]);
      this.ambienteService.mostrarId(res[0].InstitucionId).subscribe( (res1 : any) => {
        // console.log("ambientes por int", res1);
        this.lista_ambientes = res1;
        console.log("ambientes", this.lista_ambientes);
        
        
      }, (error : any) => {})
      
    }, (error : any) => {

    })

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
        console.log(this.lista_actividades);
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

  visible2: boolean = false;

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.actividadForm.reset();
    this.select_id = 0;
  }

  showDialog2(idActividad: number) {
    this.visible2 = true;
    this.ambienteForm = new FormGroup({
      AmbienteId : new FormControl('', [Validators.required]),
      Actividad_EventoId : new FormControl(idActividad, [Validators.required])
    })
  }

  hideDialog2() {
    this.visible2 = false;
    // this.actividadForm.reset();
    // this.select_id = 0;
  }

  cancelar() {
    this.hideDialog();
  }

  cancelar2() {
    this.hideDialog2();
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
      // hayq eu editar
      // this.servicio.actualizar()
      console.log('entra a editar');

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

  guardarEditar2() {

    // solo guarda no edita
    this.actividadEventoSolicitaAmbienteService.guardar(this.ambienteForm.value).subscribe((res : any) => {
      const msg = 'Ambiente Añadido';
      this.messageService.add({
        severity: 'success',
        summary: 'Añadido',
        detail: msg,
      });
      this.hideDialog2();
      this.mostrarActividades();
    }, (error : any) => { 
      const msg = 'Ambiente no actualizado';
      this.messageService.add({
        severity: 'error',
        summary: 'No añadido',
        detail: msg,
      });
      this.hideDialog2();
      this.mostrarActividades();
    })


    // if (this.select_id > 0) {
    //   // hayq eu editar
    //   // this.servicio.actualizar()
    //   // console.log('entra a editar');

    //   this.actividadEventoService
    //     .actualizar(this.select_id, this.actividadForm.value)
    //     .subscribe((res: any) => {
    //       const msg = 'Actividad Actualizado';
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'Actualizdo',
    //         detail: msg,
    //       });
    //       this.hideDialog();
    //       this.mostrarActividades();
    //     });
    // } else {
    //   this.actividadEventoService.guardar(this.actividadForm.value).subscribe(
    //     (res: any) => {
    //       const msg = 'Actividad Añadido';
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'Añadido',
    //         detail: msg,
    //       });
    //       this.hideDialog();
    //       this.mostrarActividades();
    //     },
    //     (error: any) => {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: 'Evento no añadido',
    //       });
    //     }
    //   );
    // }
  }
}
