import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-guardar-editar',
  templateUrl: './guardar-editar.component.html',
  styleUrls: ['./guardar-editar.component.scss']
})
export class GuardarEditarComponent {
  constructor(
    private servicio: AdminService,
    private router: Router,
    private messageService: MessageService
  ) {}
  institucionForm: FormGroup = new FormGroup({
    nombre_institucion: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required]),
    fecha_fin: new FormControl('', [Validators.required]),
    logo: new FormControl(''),
    celular: new FormControl(''),
    correo: new FormControl('')
  });

  ngOnInit(): void {}

  cancelar() {
    this.router.navigate(['/admin/instituciones/listar']);
    this.institucionForm.reset();
  }
  guardarEditar() {
    this.servicio.guardarEditarInstitucion(this.institucionForm.value, null).subscribe(
      (res: any) => {
        // indicar el formato de la respuesta
        // const msg =
        //     this.tipo_de_modal === 'adicionar'
        //       ? 'Evento Adicionado'
        //       : 'Evento Editado';

        const msg = 'Evento Añadido';
        this.messageService.add({
          severity: 'success',
          summary: 'Añadido',
          detail: msg,
        });
        this.router.navigate(['/admin/instituciones/listar']);
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
