import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarComponent } from './mostrar/mostrar.component';
import { ActividadesComponent } from './mostrar/actividades/actividades.component';
import { IsLoginGuard } from 'src/app/guard/is-login.guard';
import { HasRoleGuard } from 'src/app/guard/has-role.guard';
import { environmet } from 'src/environments/environment';
import {permisos} from './../../../permisos/permisos'
import { MaterialComponent } from './material/material.component';
const routes: Routes = [
  {
    path : 'mostrar',
    canActivate : [IsLoginGuard, HasRoleGuard],
    data : {
      roles : permisos.permisosHijos.eventos.agregarEventos
    },
    component : MostrarComponent
  },
  {
    path : 'actividades/:datosParaEnviar',
    component : ActividadesComponent
  },
  {
    canActivate : [IsLoginGuard, HasRoleGuard],
    data : {
      roles : permisos.permisosHijos.eventos.material
    },
    path: 'material',
    component : MaterialComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
