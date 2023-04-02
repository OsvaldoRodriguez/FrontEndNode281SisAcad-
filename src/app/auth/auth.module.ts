import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    // para formularios reactivos
    ReactiveFormsModule,
    // para poder usar HttpClient en auth (servicio)
    // HttpClientModule, (se esta llevando a core.module y como aqui  se importa coreModule automaticamente ya estar importado)
    // para usar los servicios
    CoreModule

  ]
})
export class AuthModule { }
