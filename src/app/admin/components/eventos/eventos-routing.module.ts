import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarComponent } from './mostrar/mostrar.component';
import { ActividadesComponent } from './mostrar/actividades/actividades.component';

const routes: Routes = [
  {
    path : 'mostrar',
    component : MostrarComponent
  },
  {
    path : 'actividades/:datosParaEnviar',
    component : ActividadesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
