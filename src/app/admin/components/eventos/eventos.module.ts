import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { MostrarComponent } from './mostrar/mostrar.component';
import { CoreModule } from 'src/app/core/core.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { WebModule } from 'src/app/web/web.module';
import { GuardarEditarComponent } from './guardar-editar/guardar-editar.component';


@NgModule({
  declarations: [
    MostrarComponent,
    GuardarEditarComponent
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    CoreModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    FormsModule,
    WebModule
  ], exports : [
    GuardarEditarComponent
  ]
})
export class EventosModule { }
