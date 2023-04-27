import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditoriaRoutingModule } from './auditoria-routing.module';
import { AuditoriasComponent } from './auditorias/auditorias.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { WebModule } from 'src/app/web/web.module';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    AuditoriasComponent
  ],
  imports: [
    CommonModule,
    AuditoriaRoutingModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    FormsModule,
    WebModule,
    InputTextModule,
    DialogModule
  ]
})
export class AuditoriaModule { }
