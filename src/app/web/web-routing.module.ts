import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './components/eventos/eventos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';

const routes: Routes = [
  // rutas
  {
    path : 'inicio',
    component : InicioComponent
  },
  {
    path : 'eventos',
    component : EventosComponent
  },
  {
    path: 'acerca_de',
    component : AcercaDeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
