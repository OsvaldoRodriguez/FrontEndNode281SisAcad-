import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from '../layout/app.layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path : 'sistema',
        loadChildren : () => import('./components/sistema/sistema.module').then( (m) => m.SistemaModule)
      },
      {
        path: 'eventos',
        loadChildren: () =>
          import('./components/eventos/eventos.module').then(
            (m) => m.EventosModule
          ),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./components/usuarios/usuarios.module').then(
            (m) => m.UsuariosModule
          ),
      },
      {
        path: 'instituciones',
        loadChildren: () =>
          import('./components/instituciones/instituciones.module').then(
            (m) => m.InstitucionesModule
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
