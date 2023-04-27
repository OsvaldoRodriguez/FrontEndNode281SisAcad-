import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuditoriaService } from 'src/app/core/services/auditoria.service';
import { InstitucionService } from 'src/app/core/services/institucion.service';

@Component({
  selector: 'app-auditorias',
  templateUrl: './auditorias.component.html',
  styleUrls: ['./auditorias.component.scss']
})
export class AuditoriasComponent {
  lista_de_auditoria: any = [];
  constructor(
    private institucionService: InstitucionService,
    private route: Router,
    private messageService: MessageService,
    private auditoriaService : AuditoriaService
  ) {}


  ngOnInit(): void {
    this.mostrarAuditoria();
  }

  

  replaceSlashAndBackslash(texto: string): string {
    return texto.replace(/[\/\\]/g, ' ');
  }
  
  mostrarAuditoria() {
    this.auditoriaService.mostrar().subscribe(
      (res: any) => {
        this.lista_de_auditoria = res;
      },
      (error: any) => console.error(error)
    );
  }
}
