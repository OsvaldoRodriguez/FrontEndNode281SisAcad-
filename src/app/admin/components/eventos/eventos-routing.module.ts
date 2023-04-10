import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarComponent } from './mostrar/mostrar.component';
import { GuardarEditarComponent } from './guardar-editar/guardar-editar.component';

const routes: Routes = [
  {
    path : 'mostrar',
    component : MostrarComponent
  },
  {
    path : 'guardar-editar',
    component : GuardarEditarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
