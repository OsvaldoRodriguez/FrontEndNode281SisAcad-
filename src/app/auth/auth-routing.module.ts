import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DobleAutentificacionComponent } from './components/doble-autentificacion/doble-autentificacion.component';

const routes: Routes = [
  // rutas
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'registro',
    component : RegistroComponent
  }, 
  {
    path : 'doble_autentificacion',
    component : DobleAutentificacionComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
