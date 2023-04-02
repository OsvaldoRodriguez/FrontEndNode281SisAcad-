import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PeticionInterceptor } from '../interceptors/peticion.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers : [
    // eso se hace para poder exportar
    AuthService,
    {
      // para el interceptor
      provide : HTTP_INTERCEPTORS,
      useClass : PeticionInterceptor,
      multi : true
    }
  ]
})
export class CoreModule { }
