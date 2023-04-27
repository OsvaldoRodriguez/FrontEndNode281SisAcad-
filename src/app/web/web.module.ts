import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { CardModule } from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { ActividadesComponent } from './components/eventos/actividades/actividades.component'
import {TableModule} from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialComponent } from './components/eventos/actividades/material/material.component';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [
    InicioComponent,
    EventosComponent,
    AcercaDeComponent,
    ActividadesComponent,
    MaterialComponent,
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    CardModule,
    ButtonModule,
    TableModule,
    DividerModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ToastModule,
    
    

  ], exports : [
    InicioComponent, EventosComponent
  ]
})
export class WebModule { }
