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
import { InfosistemaService } from './services/infosistema.service';
import { AmbientesService } from './services/ambientes.service';
import { RecursosService } from './services/recursos.service';
import { ActividadEventoSolicitaAmbienteService } from './services/actividad-evento-solicita-ambiente.service';
import { ActividadEventoHasExpositorService } from './services/actividad-evento-has-expositor.service';
import { MaterialDeActividadService } from './services/material-de-actividad.service';
import { ExpositoresService } from './services/expositores.service';
import { UsuarioComentaEventoService } from './services/usuario-comenta-evento.service';
import { UsuarioSeInscribeEventoService } from './services/usuario-se-inscribe-evento.service';
import { UsuarioReservaEventoService } from './services/usuario-reserva-evento.service';
import { AuditoriaModule } from '../admin/components/auditoria/auditoria.module';
import { AuditoriaService } from './services/auditoria.service';

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
    CategoriasService,
    InfosistemaService,
    AmbientesService,
    RecursosService,
    ActividadEventoSolicitaAmbienteService,
    ActividadEventoHasExpositorService,
    MaterialDeActividadService,
    ExpositoresService,
    UsuarioComentaEventoService,
    UsuarioSeInscribeEventoService,
    UsuarioReservaEventoService,
    AuditoriaService
  ],
})
export class CoreModule {}
