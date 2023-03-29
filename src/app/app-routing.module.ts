import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  // es un layout
  {
    path : '',
    component : LayoutComponent,
    children : [
      {
        // cargando un módulo
        path : 'web',
        // tiene rutas
        loadChildren : () => import('./web/web.module').then( m => m.WebModule)
      }, 
      {
        path : 'auth',
        loadChildren : () => import('./auth/auth.module').then( m => m.AuthModule)
      }
    ]
  }, 
  // para admin 
  {
    path: 'admin',
    loadChildren : () => import('./admin/admin.module').then( m => m.AdminModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
