import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ActividadEventoHasExpositorService } from 'src/app/core/services/actividad-evento-has-expositor.service';
import { ActividadEventoService } from 'src/app/core/services/actividad-evento.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { MaterialDeActividadService } from 'src/app/core/services/material-de-actividad.service';
import { PersonaService } from 'src/app/core/services/persona.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { direccion } from 'src/app/direccionArchivos/direcciones';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
})
export class MaterialComponent {
  lista_de_actividades: any = [];
  lista_personas: any = [];
  select_id: number = 0;
  visible: boolean = false;

  displayModalImage: boolean = false;
  uploadedFiles: any[] = [];
  eventos : any

  direccionImagen: any = "";
  datos: any;

  lista_de_categorias: any = [];

  //
  current_user: number = 0;




  

  constructor(
    private sanitizer: DomSanitizer,
    private usuarioService: UsuariosService,
    private personaService: PersonaService,
    private authService: AuthService,
    private route: Router,
    private messageService: MessageService,
    private actividadEventoHasExpostorService: ActividadEventoHasExpositorService,
    private actividadEventoService: ActividadEventoService,
    private categoriaService: CategoriasService,
    private materialActividadServices: MaterialDeActividadService
  ) {
    this.direccionImagen = direccion.usuarios;
  }

  actividadForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    horario_ini: new FormControl('', [Validators.required]),
    horario_fin: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    EventoId: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getIdUser();
    // this.mostrarActividades();
    this.mostrarCategorias();
    this.direccionImagen = direccion.material_expositor;
  }




  volver() {
    this.route.navigate(['/admin/eventos/material']);
  }

  getIdUser() {
    let user = this.authService.getUser();
    this.usuarioService.mostrar().subscribe(
      (res: any) => {
        for (let i = 0; i < res.length; i++) {
          // console.log(res[i].nom_usuario);
          if (res[i].nom_usuario === user) {
            this.current_user = res[i].id;
            this.getIdActividadEvento();
          }
        }
      },
      (error: any) => {
        // return 0;
      }
    );
  }

  getIdActividadEvento() {
    // console.log("datos user 1", this.current_user);
    // let idid : number = this.current_user;
    this.actividadEventoHasExpostorService
      .mostrarId(this.current_user)
      .subscribe(
        (res: any) => {
          // console.log("id actividads", res);
          // this.lista_id_actividades = res;
          this.getActividadesByUser(res);
        },
        (error: any) => {}
      );
  }

  getActividadesByUser(data: any) {
    // console.log("activides user", data);
    let only_index: any = [];

    for (let i = 0; i < data.length; i++) {
      only_index.push(data[i].Actividad_EventoId);
      // console.log(data[i].Actividad_EventoId);
    }

    this.actividadEventoService.mostrar().subscribe(
      (res: any) => {
        // console.log("activiades evento", res);
        // console.log("lista de indices", only_index);
        for (let j = 0; j < res.length; j++) {
          let flag = only_index.find((valor: any) => valor === res[j].id);
          if (flag) {
            this.lista_de_actividades.push(res[j]);
          }
        }

        // console.log('final lista', this.lista_de_actividades);
      },
      (error: any) => {}
    );
  }

  mostrarActividades() {}


  
  // guardarEditar() {
  //   if (this.select_id > 0) {
  //     this.personaService
  //       .actualizar(this.select_id, this.personaForm.value)
  //       .subscribe(
  //         (res: any) => {
  //           const msg = 'Usuario Modificado';
  //           this.messageService.add({
  //             severity: 'success',
  //             summary: 'Modificado',
  //             detail: msg,
  //           });
  //           this.hideDialog();
  //           this.mostrarActividades();
  //         },
  //         (error: any) => {
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'Error',
  //             detail: 'Usuario no Modificado',
  //           });
  //         }
  //       );
  //   } else {
  //     this.personaService.guardar(this.personaForm.value).subscribe(
  //       (res: any) => {
  //         const msg = 'Usuario Añadido';
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Añadido',
  //           detail: msg,
  //         });
  //         this.hideDialog();
  //         this.mostrarActividades();
  //       },
  //       (error: any) => {
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: 'Usuario no añadido',
  //         });
  //       }
  //     );
  //   }
  // }
  // hideDialog() {
  //   this.visible = false;
  //   this.select_id = 0;
  // }

  mostrarCategorias() {
    this.categoriaService.mostrar().subscribe(
      (res: any) => {
        this.lista_de_categorias = res;
        console.log(this.lista_de_categorias);
      },
      (error: any) => console.error(error)
    );
  }
  

  eliminar(Datos: any) {
    console.log(Datos);
    this.personaService.eliminar(Datos).subscribe(
      (res: any) => {
        this.mostrarActividades();
      },
      (error: any) => console.error(error)
    );
  }


  // guardarEditar() {
  //   if (this.select_id > 0) {
  //     // hayq eu editar
  //     // this.servicio.actualizar()
  //     console.log('entra a editar');

  //     this.actividadEventoService
  //       .actualizar(this.select_id, this.actividadForm.value)
  //       .subscribe((res: any) => {
  //         const msg = 'Actividad Actualizado';
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Actualizdo',
  //           detail: msg,
  //         });
  //         this.hideDialog();
  //         this.mostrarActividades();
  //       });
  //   } else {
  //     this.actividadEventoService.guardar(this.actividadForm.value).subscribe(
  //       (res: any) => {
  //         const msg = 'Actividad Añadido';
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Añadido',
  //           detail: msg,
  //         });
  //         this.hideDialog();
  //         this.mostrarActividades();
  //       },
  //       (error: any) => {
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: 'Evento no añadido',
  //         });
  //       }
  //     );
  //   }
  // }

  showModalDialogImage(eventos: any) {
    this.eventos = { ...eventos }; //recuperando evento (solo el seleccionado)
    // console.log("datitos", this.eventos);
    // console.log("current user", this.current_user);
    this.displayModalImage = true;
    this.showFileByExpositor();
  }

  lista_de_archivos : any
  
  showFileByExpositor(){
    // console.log("idnex de los eventos", this.eventos.id);
    
    this.materialActividadServices.mostrarIdByExpositor(this.current_user, {Actividad_EventoId : this.eventos.id}).subscribe((res : any) => {
      this.lista_de_archivos = res;
      console.log(this.lista_de_archivos);
      
    }
    , (error : any) => {})
  }

  myUploader(event?: any) {
    //event.files == files to upload
    // console.log("datitos a subir", event.files);
    // hasta ahora ya se tiene la imagen en memoria
    // subiedno por formularios de data
    let formData = new FormData();
    formData.append('imagen', event.files[0]); // porque solo es una imagen
    formData.append('Actividad_EventoId', this.eventos.id); // enviando otros datos
    // console.log("hola que tal", formData.get('Actividad_EventoId'));
    
    this.materialActividadServices.actualizarImagen(this.current_user, formData).subscribe(
      (res: any) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Imagen Actualizada',
          detail: '',
        });
        this.displayModalImage = false;
        // this.mostrarActividades();
        this.showFileByExpositor();
        // this.getIdUser();
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



}
