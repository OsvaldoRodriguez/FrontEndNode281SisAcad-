import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { InicioComponent } from './web/components/inicio/inicio.component';
import { WebModule } from './web/web.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PeticionInterceptor } from './interceptors/peticion.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule, // para importar el dashboard
    // ButtonModule, // para importar un botton desde ngprime
    // CardModule, // para tarjetas
    TableModule,
    ButtonModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: PeticionInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
