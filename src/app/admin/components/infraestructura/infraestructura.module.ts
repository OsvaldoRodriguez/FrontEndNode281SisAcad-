import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfraestructuraRoutingModule } from './infraestructura-routing.module';
import { AmbienteComponent } from './ambiente/ambiente.component';
import { CoreModule } from 'src/app/core/core.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { WebModule } from 'src/app/web/web.module';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { RecursosComponent } from './ambiente/recursos/recursos.component';


@NgModule({
  declarations: [
    AmbienteComponent,
    RecursosComponent
  ],
  imports: [
    CommonModule,
    InfraestructuraRoutingModule,
    CoreModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    FormsModule,
    WebModule,
    InputTextModule,
    ListboxModule,
    CascadeSelectModule,
    DropdownModule,
    InputTextareaModule,
    RadioButtonModule,
    FileUploadModule, 
  ]
})
export class InfraestructuraModule { }
