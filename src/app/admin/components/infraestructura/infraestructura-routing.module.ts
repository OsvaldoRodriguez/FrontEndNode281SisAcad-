import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbienteComponent } from './ambiente/ambiente.component';
import { EventosComponent } from 'src/app/web/components/eventos/eventos.component';
import { MostrarComponent } from '../eventos/mostrar/mostrar.component';

const routes: Routes = [
  {
    path : 'ambiente',
    component : AmbienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfraestructuraRoutingModule { }
