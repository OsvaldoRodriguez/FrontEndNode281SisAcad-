import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { CardModule } from 'primeng/card';
import {ButtonModule} from 'primeng/button'

@NgModule({
  declarations: [
    InicioComponent,
    EventosComponent,
    AcercaDeComponent,
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    CardModule,
    ButtonModule
  ], exports : [
    InicioComponent, EventosComponent
  ]
})
export class WebModule { }
