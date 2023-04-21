import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { IsLoginGuard } from '../guard/is-login.guard';
import { HasRoleGuard } from '../guard/has-role.guard';
import {permisos} from './../permisos/permisos'
import {permisosPadres} from './../permisos/permisosPadres'
const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate : [IsLoginGuard],
    children: [
      {
        path : 'sistema',
        canActivate : [IsLoginGuard, HasRoleGuard],
        data : {
          roles: permisosPadres.permisos.sistema
        },
        loadChildren : () => import('./components/sistema/sistema.module').then( (m) => m.SistemaModule)
      },
      {
        path: 'eventos',
        canActivate : [IsLoginGuard, HasRoleGuard],
        data : {
          roles: permisosPadres.permisos.eventos
        },
        loadChildren: () =>
          import('./components/eventos/eventos.module').then(
            (m) => m.EventosModule
          ),
      },
      {
        path: 'usuarios',
        canActivate : [IsLoginGuard, HasRoleGuard],
        data : {
          roles: permisosPadres.permisos.usuarios
        },
        loadChildren: () =>
          import('./components/usuarios/usuarios.module').then(
            (m) => m.UsuariosModule
          ),
      },

      {
        path: 'infraestructura',
        canActivate : [IsLoginGuard, HasRoleGuard],
        data : {
          roles: permisosPadres.permisos.infraestructura
        },
        loadChildren: () =>
          import('./components/infraestructura/infraestructura.module').then(
            (m) => m.InfraestructuraModule
          ),
      },
      {
        path: 'instituciones',
        canActivate : [IsLoginGuard, HasRoleGuard],
        data : {
          roles: permisosPadres.permisos.instituciones
        },
        loadChildren: () =>
          import('./components/instituciones/instituciones.module').then(
            (m) => m.InstitucionesModule
          ),
      },
      {
        path: 'auditoria',
        canActivate : [IsLoginGuard, HasRoleGuard],
        data : {
          roles: permisosPadres.permisos.auditoria
        },
        loadChildren: () =>
          import('./components/auditoria/auditoria.module').then(
            (m) => m.AuditoriaModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
