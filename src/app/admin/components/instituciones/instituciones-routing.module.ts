import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { GuardarEditarComponent } from './guardar-editar/guardar-editar.component';

const routes: Routes = [
  {
    path : 'listar',
    component : ListarComponent
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
export class InstitucionesRoutingModule { }
