import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ActividadEventoHasExpositorService } from 'src/app/core/services/actividad-evento-has-expositor.service';
import { ActividadEventoService } from 'src/app/core/services/actividad-evento.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { PersonaService } from 'src/app/core/services/persona.service';
import { RolesService } from 'src/app/core/services/roles.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { direccion } from 'src/app/direccionArchivos/direcciones';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent {

  lista_id_actividades : any = [];
  lista_de_actividades : any = [];
  lista_personas: any = [];
  select_id: number = 0;
  visible: boolean = false;


  displayModalImage: boolean = false;
  uploadedFiles: any[] = [];
  direccionImagen : any = "";
  datos : any;

  // 
  id_user_find : any;
  constructor(
    private usuarioService: UsuariosService,
    private personaService: PersonaService,
    private authService : AuthService,
    private messageService: MessageService,
    private actividadEventoHasExpostorService : ActividadEventoHasExpositorService,
    private actividadEventoService : ActividadEventoService

  ) {
    
    this.direccionImagen = direccion.usuarios;
    // console.log(this.direccionImagen);
    
    // this.getIdActividades();
    
  }

  personaForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    paterno: new FormControl('', [Validators.required]),
    materno: new FormControl('', [Validators.required]),
    fecha_nac: new FormControl(0, [Validators.required]),
    sexo : new FormControl(0, [Validators.required])
  });
  ngOnInit(): void {
    this.getIdActividades();
    this.mostrarActividades();
  }

  getIdActividades(){
    let user = this.authService.getUser();
    
    let id_user : number = 0;
    
    this.usuarioService.mostrar().subscribe((res : any) => {
      // console.log("mostrando usuaior", res[0]);
      for(let i = 0; i < res.length; i++){
        if(res[i].nom_usuario === user){
          // console.log(res[i]);
          this.id_user_find  = res[i].id;
          // console.log("sldfksjdlfsdjfs", this.id_user_find);
          
          this.actividadEventoHasExpostorService.mostrarId(this.id_user_find).subscribe((res1 : any) => {
            this.lista_id_actividades = res1;
            // console.log("actividad de expositor" , this.lista_id_actividades);
            let auxiliar = [];
            for(let j = 0; j < this.lista_id_actividades.length; j++){
              // console.log(this.lista_id_actividades[j].Actividad_EventoId);
              auxiliar.push(this.lista_id_actividades[j].Actividad_EventoId);
            }
            console.log(auxiliar);
            
            for(let j = 0; j < auxiliar.length; j++){
              console.log("auxiliar", auxiliar[j]);
              
              this.actividadEventoService.mostrarId(auxiliar[j]).subscribe((res2 : any) => {
                console.log(res2 + ", fury");
                
              }, (error : any)=> {

              })
            }

            
          }, (error : any) => {
      
          })
          
        }
        
      }
    }, (error : any) => {

    })

    
    
    

    
  }



  


  mostrarActividades() {

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
          this.mostrarActividades();
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
          this.mostrarActividades();
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
        this.mostrarActividades();
      },
      (error: any) => console.error(error)
    );
  }



}
