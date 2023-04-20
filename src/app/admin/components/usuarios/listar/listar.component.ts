import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { PersonaService } from 'src/app/core/services/persona.service';
import { RolesService } from 'src/app/core/services/roles.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

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
  constructor(
    private usuarioService: UsuariosService,
    private route: Router,
    private personaService: PersonaService,
    private authService : AuthService,
    private messageService: MessageService,
    private rolesService : RolesService

  ) {}

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
        console.log(this.lista_roles);
      },
      (error: any) => console.error(error)
    );
  }


  mostrarPersonas() {
    this.personaService.mostrar().subscribe(
      (res: any) => {
        this.lista_personas = res;
        console.log(this.lista_personas);
      },
      (error: any) => console.log(error)
    );
  }

  mostrarUsuarios() {
    this.usuarioService.mostrar().subscribe(
      (res: any) => {
        this.lista_usuarios = res;
        console.log(this.lista_usuarios);
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
}
