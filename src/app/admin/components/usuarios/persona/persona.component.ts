import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { PersonaService } from 'src/app/core/services/persona.service';
import { RolesService } from 'src/app/core/services/roles.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { direccion } from 'src/app/direccionArchivos/direcciones';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent {
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

  personaForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    paterno: new FormControl('', [Validators.required]),
    materno: new FormControl('', [Validators.required]),
    fecha_nac: new FormControl(0, [Validators.required]),
    sexo : new FormControl(0, [Validators.required])
  });
  ngOnInit(): void {
    this.mostrarPersonas();
  }

  


  mostrarPersonas() {
    this.personaService.mostrar().subscribe(
      (res: any) => {
        this.lista_personas = res;
      },
      (error: any) => console.log(error)
    );
  }

  
  showDialog() {
    this.visible = true;
    this.personaForm.reset();
  }

  cancelar() {
    this.hideDialog();
    this.select_id = 0;
    this.personaForm.reset();
  }
  guardarEditar() {
    if (this.select_id > 0) {
      this.personaService.actualizar(this.select_id, this.personaForm.value).subscribe(
        (res: any) => {
          const msg = 'Usuario Modificado';
          this.messageService.add({
            severity: 'success',
            summary: 'Modificado',
            detail: msg,
          });
          this.hideDialog();
          this.mostrarPersonas();
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
      this.personaService.guardar(this.personaForm.value).subscribe(
        (res: any) => {
          const msg = 'Usuario Añadido';
          this.messageService.add({
            severity: 'success',
            summary: 'Añadido',
            detail: msg,
          });
          this.hideDialog();
          this.mostrarPersonas();
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

    this.personaForm = new FormGroup({
      nombre: new FormControl(datos.nombre, [Validators.required]),
      paterno: new FormControl(datos.paterno, [Validators.required]),
      materno: new FormControl(datos.materno, [Validators.required]),
      fecha_nac: new FormControl(datos.fecha_nac, [Validators.required]),
      sexo : new FormControl(datos.sexo, [Validators.required])
    });
  }
  adicionar() {
    this.showDialog();
  }

  eliminar(Datos: any) {
    console.log(Datos);
    this.personaService.eliminar(Datos).subscribe(
      (res: any) => {
        this.mostrarPersonas();
      },
      (error: any) => console.error(error)
    );
  }


  
}
