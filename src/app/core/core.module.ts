import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { PeticionInterceptor } from '../interceptors/peticion.interceptor';
import { AdminService } from './services/admin.service';
import { EventosService } from './services/eventos.service';
import { InstitucionService } from './services/institucion.service';
import { UsuariosService } from './services/usuarios.service';
import { PersonaService } from './services/persona.service';
import { RolesService } from './services/roles.service';
import { ActividadEventoService } from './services/actividad-evento.service';
import { CategoriasService } from './services/categorias.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    // eso se hace para poder exportar
    AuthService,
    {
      // para el interceptor
      provide: HTTP_INTERCEPTORS,
      useClass: PeticionInterceptor,
      multi: true,
    },
    UsuariosService,
    AdminService,
    EventosService,
    InstitucionService,
    PersonaService,
    RolesService,
    ActividadEventoService,
    CategoriasService
  ],
})
export class CoreModule {}
