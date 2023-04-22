import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AmbientesService } from 'src/app/core/services/ambientes.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoriasService } from 'src/app/core/services/categorias.service';

@Component({
  selector: 'app-lista-ambientes',
  templateUrl: './lista-ambientes.component.html',
  styleUrls: ['./lista-ambientes.component.scss'],
})
export class ListaAmbientesComponent {
  // recuprando los datos por url
  datosDelPadre: any = null;
  datosDelPadreActualizados = new Subject<any>();


  lista_estados : any = [{descripcion : 'Activo'}, {descripcion : 'Inactivo'}]
  lista_ambientes: any = [];
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private ambienteService: AmbientesService,
    private route: Router,
    private router: ActivatedRoute,
    private categoriaService: CategoriasService
  ) {}
  lista_de_categorias: any = [];
  select_id = 0; // para saber si es editar

  datosParaEnviar: any = 'enviando del padres';

  ambienteForm: FormGroup = new FormGroup({
    tipo_ambiente: new FormControl('', [Validators.required]),
    area_ambiente: new FormControl('', [Validators.required]),
    direccion_ambiente: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    InstitucionId: new FormControl(this.datosDelPadre, [Validators.required]),
  });
  volver() {
    this.route.navigate(['/admin/infraestructura/crear-ambiente']);
  }
  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.datosDelPadre = params.get('datosParaEnviar');
      console.log(this.datosDelPadre);

      this.datosDelPadreActualizados.next(this.datosDelPadre);
      this.mostrarAmientes();
      this.mostrarCategorias();

      this.ambienteForm = new FormGroup({
        tipo_ambiente: new FormControl('', [Validators.required]),
        area_ambiente: new FormControl('', [Validators.required]),
        direccion_ambiente: new FormControl('', [Validators.required]),
        estado: new FormControl('', [Validators.required]),
        InstitucionId: new FormControl(this.datosDelPadre, [
          Validators.required,
        ]),
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
  mostrarAmientes() {
    this.ambienteService.mostrarId(this.datosDelPadre).subscribe(
      (res: any) => {
        this.lista_ambientes = res;
        console.log(this.lista_ambientes);
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
    this.ambienteService.eliminar(Datos).subscribe(
      (res: any) => {
        this.mostrarAmientes();
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
    this.ambienteForm = new FormGroup({
      tipo_ambiente: new FormControl('', [Validators.required]),
      area_ambiente: new FormControl('', [Validators.required]),
      direccion_ambiente: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      InstitucionId: new FormControl(this.datosDelPadre, [
        Validators.required,
      ]),
    });
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.ambienteForm.reset();
    this.ambienteForm = new FormGroup({
      tipo_ambiente: new FormControl('', [Validators.required]),
      area_ambiente: new FormControl('', [Validators.required]),
      direccion_ambiente: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      InstitucionId: new FormControl(this.datosDelPadre, [
        Validators.required,
      ]),
    });
    this.select_id = 0;
  }

  cancelar() {
    this.select_id = 0;
    this.ambienteForm = new FormGroup({
      tipo_ambiente: new FormControl('', [Validators.required]),
      area_ambiente: new FormControl('', [Validators.required]),
      direccion_ambiente: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      InstitucionId: new FormControl(this.datosDelPadre, [
        Validators.required,
      ]),
    });
    this.hideDialog();
  }

  editar(datos: any) {
    this.select_id = datos.id;

    this.ambienteForm.patchValue(datos);
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

      this.ambienteService
        .actualizar(this.select_id, this.ambienteForm.value)
        .subscribe((res: any) => {
          const msg = 'Ambiente Actualizado';
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizdo',
            detail: msg,
          });
          this.hideDialog();
          this.mostrarAmientes();
        });
    } else {
      this.ambienteService.guardar(this.ambienteForm.value).subscribe(
        (res: any) => {
          const msg = 'Ambiente Añadido';
          this.messageService.add({
            severity: 'success',
            summary: 'Añadido',
            detail: msg,
          });
          this.hideDialog();
          this.mostrarAmientes();
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ambiente no añadido',
          });
        }
      );
    }
  }


  navegarHaciaHijo(id: any) {
    this.datosParaEnviar = id;
    this.route.navigate(['/admin/infraestructura/lista-recursos', this.datosParaEnviar]);
  }
}
