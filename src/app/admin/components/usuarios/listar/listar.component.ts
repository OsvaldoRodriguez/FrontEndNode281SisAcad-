import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { PersonaService } from 'src/app/core/services/persona.service';
import { RolesService } from 'src/app/core/services/roles.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { direccion } from 'src/app/direccionArchivos/direcciones';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  lista_usuarios: any = [];
  lista_roles : any = [];
  lista_personas: any = [];
  select_id: number = 0;
  visible: boolean = false;


  displayModalImage: boolean = false;
  uploadedFiles: any[] = [];
  direccionImagen : any = "";
  datos : any;

  constructor(
    private usuarioService: UsuariosService,
    private route: Router,
    private personaService: PersonaService,
    private authService : AuthService,
    private messageService: MessageService,
    private rolesService : RolesService

  ) {
    
    this.direccionImagen = direccion.usuarios;
    // console.log(this.direccionImagen);
    
  }

  usuarioForm: FormGroup = new FormGroup({
    nom_usuario: new FormControl('', [Validators.required]),
    contrasenia: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    PersonaId: new FormControl(0, [Validators.required]),
    RolId : new FormControl(0, [Validators.required])
  });
  ngOnInit(): void {
    this.mostrarUsuarios();
    this.mostrarPersonas();
    this.mostrarRoles();
  }

  mostrarRoles() {
    this.rolesService.mostrar().subscribe(
      (res: any) => {
        this.lista_roles = res;
      },
      (error: any) => console.error(error)
    );
  }


  mostrarPersonas() {
    this.personaService.mostrar().subscribe(
      (res: any) => {
        this.lista_personas = res;
      },
      (error: any) => console.log(error)
    );
  }

  mostrarUsuarios() {
    this.usuarioService.mostrar().subscribe(
      (res: any) => {
        this.lista_usuarios = res;
      },
      (error: any) => console.error(error)
    );
  }

  showDialog() {
    this.visible = true;
    this.usuarioForm.reset();
  }

  cancelar() {
    this.hideDialog();
    this.select_id = 0;
    this.usuarioForm.reset();
  }
  guardarEditar() {
    if (this.select_id > 0) {
      this.authService.actualizar(this.select_id, this.usuarioForm.value).subscribe(
        (res: any) => {
          const msg = 'Usuario Modificado';
          this.messageService.add({
            severity: 'success',
            summary: 'Modificado',
            detail: msg,
          });
          this.hideDialog();
          this.mostrarUsuarios();
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Usuario no Modificado',
          });
        }
      );
    } else {
      this.authService.registro_user(this.usuarioForm.value).subscribe(
        (res: any) => {
          const msg = 'Usuario Añadido';
          this.messageService.add({
            severity: 'success',
            summary: 'Añadido',
            detail: msg,
          });
          this.hideDialog();
          this.mostrarUsuarios();
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Usuario no añadido',
          });
        }
      );
    }
  }
  hideDialog() {
    this.visible = false;
    this.select_id = 0;
  }
  editar(datos: any) {
    this.showDialog();
    this.select_id = datos.id;
    this.usuarioForm = new FormGroup({
      nom_usuario: new FormControl(datos.nom_usuario, [Validators.required]),
      contrasenia: new FormControl(datos.contrasenia, [Validators.required]),
      correo: new FormControl(datos.correo, [Validators.required]),
      PersonaId: new FormControl(datos.PersonaId, [Validators.required]),
      RolId : new FormControl(datos.Rols[0]?.id, [Validators.required])
    });
  }
  adicionar() {
    this.showDialog();
  }

  eliminar(Datos: any) {
    console.log(Datos);
    this.usuarioService.eliminar(Datos).subscribe(
      (res: any) => {
        this.mostrarUsuarios();
      },
      (error: any) => console.error(error)
    );
  }


  showModalDialogImage(datos: any) {
    this.datos = { ...datos }; //recuperando evento (solo el seleccionado)
    this.displayModalImage = true;
  }

  myUploader(event?: any) {
    //event.files == files to upload
    console.log(event.files);
    // hasta ahora ya se tiene la imagen en memoria
    // subiedno por formularios de data
    let formData = new FormData();
    formData.append('imagen', event.files[0]); // porque solo es una imagen

    this.usuarioService.actualizarImagen(this.datos.id, formData).subscribe(
      (res: any) => {
        this.displayModalImage = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Imagen Actualizada',
          detail: '',
        });
        this.mostrarUsuarios();
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
