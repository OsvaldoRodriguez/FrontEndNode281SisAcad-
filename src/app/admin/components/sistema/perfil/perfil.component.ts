import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { PersonaService } from 'src/app/core/services/persona.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { direccion } from 'src/app/direccionArchivos/direcciones';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  datosUsuario: any = {};
  usuario_actual: any;
  datosPersona: any;
  displayModalImage: boolean = false;
  uploadedFiles: any[] = [];
  datosImagen: any;
  url_imagen: any;

  constructor(
    private usuarioService: UsuariosService,
    private messageService: MessageService,
    private personaSerivce: PersonaService,
    private authService: AuthService
  ) {
    this.usuario_actual = this.authService.getUser();
    console.log('usuario actual', this.usuario_actual);

    this.mostrar();
  }

  lista_estados: any = [
    { descripcion: 'Masculino' },
    { descripcion: 'Femenino' },
    { descripcion: 'Otros' },
  ];
  usuarioForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    paterno: new FormControl('', [Validators.required]),
    materno: new FormControl('', [Validators.required]),
    fecha_nac: new FormControl('', [Validators.required]),
    sexo: new FormControl('', [Validators.required]),

    nom_usuario: new FormControl('', [Validators.required]),
    contrasenia: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    PersonaId: new FormControl('', [Validators.required]),
    id : new FormControl('', [Validators.required]),
  });

  mostrar() {
    let id_persona: number = 0;
    this.usuarioService.mostrar().subscribe(
      (res: any) => {
        this.datosUsuario = res;
        // console.log('usuario', res);
        // traendo datos de la persona
        for (let i = 0; i < this.datosUsuario.length; i++) {
          // console.log("recorriendo aray", this.datosUsuario.nom_usuario);
          if (this.usuario_actual === this.datosUsuario[i].nom_usuario) {
            // console.log('iddddd ', this.datosUsuario[i].PersonaId);
            id_persona = this.datosUsuario[i].PersonaId;
            this.datosUsuario = this.datosUsuario[i];

            this.personaSerivce.mostrarId(id_persona).subscribe(
              (res: any) => {
                this.datosPersona = res;
                console.log(this.datosPersona);

                this.usuarioForm = new FormGroup({
                  nombre: new FormControl(this.datosPersona[0].nombre, [
                    Validators.required,
                  ]),
                  paterno: new FormControl(this.datosPersona[0].paterno, [
                    Validators.required,
                  ]),
                  materno: new FormControl(this.datosPersona[0].materno, [
                    Validators.required,
                  ]),
                  fecha_nac: new FormControl(this.datosPersona[0].fecha_nac, [
                    Validators.required,
                  ]),
                  sexo: new FormControl(this.datosPersona[0].sexo, [
                    Validators.required,
                  ]),

                  nom_usuario: new FormControl(this.datosUsuario.nom_usuario, [
                    Validators.required,
                  ]),
                  contrasenia: new FormControl(this.datosUsuario.contrasenia, [
                    Validators.required,
                  ]),
                  correo: new FormControl(this.datosUsuario.correo, [
                    Validators.required,
                  ]),
                  PersonaId: new FormControl(this.datosPersona[0].id, [
                    Validators.required,
                  ]),
                  id: new FormControl(this.datosUsuario.id, [
                    Validators.required,
                  ]),
                  
                });

                this.url_imagen = direccion.usuarios + this.datosUsuario.foto;
              },
              (error: any) => {}
            );
          }
        }
      },
      (error: any) => {
        console.log(error);
      }
    );

    // console.log("usuario", this.datosUsuario);
    // console.log("persona", this.datosPersona);
  }
  guardarActualizar(datos: any) {
    let id: number = datos.PersonaId;
    const datos_per_act = {
      nombre: datos.nombre,
      paterno: datos.paterno,
      materno: datos.materno,
      fecha_nac : datos.fecha_nac,
      sexo : datos.sexo
    };
    this.personaSerivce.actualizar(id, datos_per_act).subscribe(
      (res: any) => {
        this.mostrar();
          this.messageService.add({
            severity: 'info',
            summary: 'Datos Actualizados',
            detail: '',
          });
      },
      (error: any) => {
        this.mostrar();
          this.messageService.add({
            severity: 'error',
            summary: 'Error al actualizar',
            detail: '',
          });
      }
    );

    let id_user: number = datos.id;
    const datos_user_act = {
      contrasenia: datos.contrasenia,
      correo: datos.correo
    };
    // $2b$12$DBG8lr/uLWryZUm4vu.XPeFFsiV3N8D/u8Uzuqe2QrKqRVCCBe/wi
    this.authService.actualizarPerfil(id_user, datos_user_act).subscribe(
      (res: any) => {
        this.mostrar();
          this.messageService.add({
            severity: 'info',
            summary: 'Datos Actualizados',
            detail: '',
          });
      },
      (error: any) => {
        this.mostrar();
          this.messageService.add({
            severity: 'error',
            summary: 'Error al actualizar',
            detail: '',
          });
      }
    );

    


    // this.usuarioService.guardar(datos).subscribe(
    //   (res: any) => {
    //     // console.log(res);
    //     this.mostrar();
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }

  //imagenes
  showModalDialogImage(datosImagen: any) {
    this.datosImagen = { ...datosImagen }; //recuperando evento (solo el seleccionado)
    this.displayModalImage = true;
  }

  myUploader(event?: any) {
    //event.files == files to upload
    console.log(event.files);
    // hasta ahora ya se tiene la imagen en memoria
    // subiedno por formularios de data
    let formData = new FormData();
    formData.append('imagen', event.files[0]); // porque solo es una imagen

    this.usuarioService
      .actualizarImagen(this.datosImagen.id, formData)
      .subscribe(
        (res: any) => {
          this.displayModalImage = false;
          this.mostrar();
          this.messageService.add({
            severity: 'info',
            summary: 'Imagen Actualizada',
            detail: '',
          });
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
