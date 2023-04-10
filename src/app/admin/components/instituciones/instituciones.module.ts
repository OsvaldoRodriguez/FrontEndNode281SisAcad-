import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitucionesRoutingModule } from './instituciones-routing.module';
import { ListarComponent } from './listar/listar.component';
import { GuardarEditarComponent } from './guardar-editar/guardar-editar.component';
import { CoreModule } from 'src/app/core/core.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { WebModule } from 'src/app/web/web.module';


@NgModule({
  declarations: [
    ListarComponent,
    GuardarEditarComponent
  ],
  imports: [
    CommonModule,
    InstitucionesRoutingModule,
    CoreModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    FormsModule,
    WebModule
  ]
})
export class InstitucionesModule { }
