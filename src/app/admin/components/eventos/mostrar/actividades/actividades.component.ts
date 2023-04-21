import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// para el paso  de parametros
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ActividadEventoService } from 'src/app/core/services/actividad-evento.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { EventosService } from 'src/app/core/services/eventos.service';
import { InstitucionService } from 'src/app/core/services/institucion.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit{
  
  // recuprando los datos por url
  datosDelPadre: any = null;
  datosDelPadreActualizados = new Subject<any>();

  // constructor(private route: ActivatedRoute) {}
  lista_actividades: any = [];
  constructor(
    private authService : AuthService,
    private messageService: MessageService,
    private eventosService: EventosService,
    private route: Router,
    private router : ActivatedRoute,
    private actividadEventoService: ActividadEventoService,
    private categoriaService : CategoriasService,
  ) {
  }
  lista_de_categorias : any = [];
  select_id = 0; // para saber si es editar


  

  
  actividadForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    horario_ini: new FormControl('', [Validators.required]),
    horario_fin: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    EventoId : new FormControl('', [Validators.required]),
  });
  volver(){
    this.route.navigate(['/admin/eventos/mostrar']);
  }
  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.datosDelPadre = params.get('datosParaEnviar');
      this.datosDelPadreActualizados.next(this.datosDelPadre);
      this.mostrarActividades();
      this.mostrarCategorias();
      
  this.actividadForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    horario_ini: new FormControl('', [Validators.required]),
    horario_fin: new FormControl('', [Validators.required]),
    CategoriaId: new FormControl('', [Validators.required]),
    EventoId : new FormControl(this.datosDelPadre, [Validators.required]),
  });
      
    });

    // console.log("en el hijo", this.datosDelPadre);
    
  }

  // los que se aumento
  

  


  tienePermisos(permisos : string[]) : boolean {
    let permisos_permitidos = permisos;
    const usuario_actual : string[] = this.authService.getRol();
    return permisos_permitidos.some( (r : string) => usuario_actual.includes(r));
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

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.actividadForm.reset();
    this.select_id = 0;
  }

  

  cancelar() {
    this.hideDialog();
  }

  editar(datos: any) {
    this.select_id = datos.id;

    this.actividadForm.patchValue(datos);
    this.showDialog();
  }

  adicionarActividad(id : any){
    // console.log("esta lleganod");
    this.select_id = id;
    console.log(this.select_id)
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


}
