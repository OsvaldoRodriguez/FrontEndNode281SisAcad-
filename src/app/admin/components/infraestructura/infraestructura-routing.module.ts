import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbienteComponent } from './ambiente/ambiente.component';
import { EventosComponent } from 'src/app/web/components/eventos/eventos.component';
import { MostrarComponent } from '../eventos/mostrar/mostrar.component';
import { CrearAmbienteComponent } from './crear-ambiente/crear-ambiente.component';
import { ListaAmbientesComponent } from './crear-ambiente/lista-ambientes/lista-ambientes.component';
import { ListaRecursosComponent } from './crear-ambiente/lista-ambientes/lista-recursos/lista-recursos.component';
import { IsLoginGuard } from 'src/app/guard/is-login.guard';
import { HasRoleGuard } from 'src/app/guard/has-role.guard';
import { permisosPadres } from 'src/app/permisos/permisosPadres';
import { ActividadesComponent } from './ambiente/actividades/actividades.component';

const routes: Routes = [
  {
    path: 'ambiente',
    canActivate: [IsLoginGuard, HasRoleGuard],
    data: {
      roles: permisosPadres.permisos.infraestructura,
    },
    component: AmbienteComponent,
  },

  {
    path : 'actividades/:datosParaEnviar',
    component : ActividadesComponent
  },
  {
    path: 'crear-ambiente',
    canActivate: [IsLoginGuard, HasRoleGuard],
    data: {
      roles: permisosPadres.permisos.infraestructura,
    },
    component: CrearAmbienteComponent,
  },
  {
    path: 'ambientes/:datosParaEnviar',
    component: ListaAmbientesComponent,
  },
  {
    path: 'lista-recursos/:datosParaEnviar',
    component: ListaRecursosComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfraestructuraRoutingModule {}
