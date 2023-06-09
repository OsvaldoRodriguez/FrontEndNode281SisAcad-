import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import { InformacionComponent } from './informacion/informacion.component';
import { CoreModule } from 'src/app/core/core.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { WebModule } from 'src/app/web/web.module';
import { FileUploadModule } from 'primeng/fileupload';
import { PerfilComponent } from './perfil/perfil.component';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
  declarations: [
    InformacionComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    CoreModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    FormsModule,
    WebModule,
    FileUploadModule,
    RadioButtonModule,
  ]
})
export class SistemaModule { }
