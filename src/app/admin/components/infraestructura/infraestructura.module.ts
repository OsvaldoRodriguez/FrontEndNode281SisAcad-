import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfraestructuraRoutingModule } from './infraestructura-routing.module';
import { AmbienteComponent } from './ambiente/ambiente.component';


@NgModule({
  declarations: [
    AmbienteComponent
  ],
  imports: [
    CommonModule,
    InfraestructuraRoutingModule
  ]
})
export class InfraestructuraModule { }
