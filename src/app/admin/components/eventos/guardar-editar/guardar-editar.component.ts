import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-guardar-editar',
  templateUrl: './guardar-editar.component.html',
  styleUrls: ['./guardar-editar.component.scss'],
})
export class GuardarEditarComponent implements OnInit, OnChanges {
  @Input() textoRecibido : any = null;
  constructor(
    private servicio: AdminService,
    private router: Router,
    private messageService: MessageService
  ) {}

  lista_de_instituciones : any = [];
  eventoForm: FormGroup = new FormGroup({
    nombre_Evento: new FormControl('', [Validators.required]),
    fecha_ini: new FormControl('', [Validators.required]),
    fecha_fin: new FormControl('', [Validators.required]),
    logo: new FormControl(''),
    InstitucionId : new FormControl(0, [Validators.required]),
  });

  ngOnInit(): void {
    console.log('valor incial ' + this.textoRecibido);
    this.mostrarInstituciones();
  }

  mostrarInstituciones() {
    this.servicio.listarGeneral(`http://localhost:3000/api/institucion`).subscribe(
      (res: any) => {
        this.lista_de_instituciones = Object.values(res)[0];
        console.log(this.lista_de_instituciones);
      },
      (error: any) => console.error(error)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.textoRecibido) {
      console.log("llega por editar");
      // si es editar
      // console.log("lo que esta llegando onCanges", this.edicion_evento);

      this.eventoForm.patchValue(this.textoRecibido);
    } else {
      console.log("no llega nada");
      
      this.eventoForm.reset();
    }
  }

  cancelar() {
    this.router.navigate(['/admin/eventos/mostrar']);
  }
  guardarEditar() {
    console.log("datos del form: " + this.eventoForm.value);
    
    this.servicio.guardarEditarEvento(this.eventoForm.value, null).subscribe(
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
        this.router.navigate(['/admin/eventos/mostrar']);
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
