import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';


@NgModule({
  declarations: [
    InicioComponent,
    EventosComponent,
    AcercaDeComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule
  ]
})
export class WebModule { }
