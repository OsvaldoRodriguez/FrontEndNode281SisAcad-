import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditoriaRoutingModule } from './auditoria-routing.module';
import { AuditoriasComponent } from './auditorias/auditorias.component';


@NgModule({
  declarations: [
    AuditoriasComponent
  ],
  imports: [
    CommonModule,
    AuditoriaRoutingModule
  ]
})
export class AuditoriaModule { }
