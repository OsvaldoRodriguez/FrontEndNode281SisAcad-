import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacionComponent } from './informacion/informacion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { IsLoginGuard } from 'src/app/guard/is-login.guard';
import { HasRoleGuard } from 'src/app/guard/has-role.guard';
import { permisosPadres } from 'src/app/permisos/permisosPadres';
import { permisos } from 'src/app/permisos/permisos';

const routes: Routes = [
  {
    path: 'informacion',
    component: InformacionComponent,
    canActivate: [IsLoginGuard, HasRoleGuard],
    data: {
      roles: permisos.permisosHijos.sistema.informacion,
    },
  },
  {
    path: 'perfil',
    canActivate: [IsLoginGuard, HasRoleGuard],
    data: {
      roles: permisos.permisosHijos.sistema.perfil,
    },
    component: PerfilComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SistemaRoutingModule {}
