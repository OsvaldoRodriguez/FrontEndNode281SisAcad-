import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AmbientesService } from 'src/app/core/services/ambientes.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { RecursosService } from 'src/app/core/services/recursos.service';

@Component({
  selector: 'app-lista-recursos',
  templateUrl: './lista-recursos.component.html',
  styleUrls: ['./lista-recursos.component.scss'],
})
export class ListaRecursosComponent {
  datosDelPadre: any = null;
  datosDelPadreActualizados = new Subject<any>();

  lista_estados: any = [
    { descripcion: 'Nuevo' },
    { descripcion: 'Bueno' },
    { descripcion: 'Regular' },
    { descripcion: 'Malo' },
  ];
  lista_de_recursos: any = [];
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private recursoService: RecursosService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  select_id = 0; // para saber si es editar

  datosParaEnviar: any = 'enviando del padres';

  recursoForm: FormGroup = new FormGroup({
    tipo_recurso: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    AmbienteId: new FormControl(this.datosDelPadre, [Validators.required]),
  });
  volver() {
    this.route.navigate(['/admin/infraestructura/crear-ambiente']);
  }
  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.datosDelPadre = params.get('datosParaEnviar');
      console.log(this.datosDelPadre);

      this.datosDelPadreActualizados.next(this.datosDelPadre);
      this.mostrarRecursos();

      this.recursoForm = new FormGroup({
        tipo_recurso: new FormControl('', [Validators.required]),
        cantidad: new FormControl('', [Validators.required]),
        estado: new FormControl('', [Validators.required]),
        AmbienteId: new FormControl(this.datosDelPadre, [Validators.required]),
      });
    });

    // console.log("en el hijo", this.datosDelPadre);
  }

  // los que se aumento

  tienePermisos(permisos: string[]): boolean {
    let permisos_permitidos = permisos;
    const usuario_actual: string[] = this.authService.getRol();
    return permisos_permitidos.some((r: string) => usuario_actual.includes(r));
  }
  // para compartir
  mostrarRecursos() {
    this.recursoService.mostrarId(this.datosDelPadre).subscribe(
      (res: any) => {
        this.lista_de_recursos = res;
        // console.log(this.lista_de_recursos);
      },
      (error: any) => console.error(error)
    );
  }

  eliminar(Datos: any) {
    console.log(Datos);
    this.recursoService.eliminar(Datos).subscribe(
      (res: any) => {
        this.mostrarRecursos();
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
    this.recursoForm = new FormGroup({
      tipo_recurso: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      AmbienteId: new FormControl(this.datosDelPadre, [Validators.required]),
    });
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.recursoForm.reset();
    this.recursoForm = new FormGroup({
      tipo_recurso: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      AmbienteId: new FormControl(this.datosDelPadre, [Validators.required]),
    });
    this.select_id = 0;
  }

  cancelar() {
    this.select_id = 0;
    this.hideDialog();
  }

  editar(datos: any) {
    this.select_id = datos.id;
    console.log("valor para editar", datos);
    this.showDialog();
    // this.recursoForm = new FormGroup({
    //   tipo_recurso: new FormControl(datos.tipo_recurso, [Validators.required]),
    //   cantidad: new FormControl(datos.cantidad, [Validators.required]),
    //   estado: new FormControl(datos.estado, [Validators.required]),
    //   AmbienteId: new FormControl(datos.AmbienteId, [Validators.required]),
    // });
    this.recursoForm.patchValue(datos);
  }

  adicionarActividad(id: any) {
    // console.log("esta lleganod");
    this.select_id = id;
    console.log(this.select_id);
    // this.route.navigate(['/admin/eventos/actividades']);
  }

  guardarEditar() {
    if (this.select_id > 0) {
      this.recursoService
        .actualizar(this.select_id, this.recursoForm.value)
        .subscribe((res: any) => {
          const msg = 'Recurso Actualizado';
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizdo',
            detail: msg,
          });
          this.hideDialog();
          this.mostrarRecursos();
        });
    } else {
      this.recursoService.guardar(this.recursoForm.value).subscribe(
        (res: any) => {
          const msg = 'Recurso Añadido';
          this.messageService.add({
            severity: 'success',
            summary: 'Añadido',
            detail: msg,
          });
          this.hideDialog();
          this.mostrarRecursos();
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Recurso no añadido',
          });
        }
      );
    }
  }

  navegarHaciaHijo(id: any) {
    this.datosParaEnviar = id;
    this.route.navigate([
      '/admin/infraestructura/lista-recursos',
      this.datosParaEnviar,
    ]);
  }
}
