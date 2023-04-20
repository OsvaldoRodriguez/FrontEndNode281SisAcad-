import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListarComponent } from './listar/listar.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea'
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog'
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [
    ListarComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    TableModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    ReactiveFormsModule,
    ToastModule,
    FileUploadModule,
    RadioButtonModule,
    InputNumberModule,
    InputTextareaModule,
    ToolbarModule,
    DropdownModule,
    ConfirmDialogModule,
    InputTextareaModule,
    InputTextModule
  ]
})
export class UsuariosModule { }
