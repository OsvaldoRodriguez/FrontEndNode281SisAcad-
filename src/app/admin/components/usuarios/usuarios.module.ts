import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListarComponent } from './listar/listar.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    ListarComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    TableModule,
    ButtonModule,
    ToastModule
  ]
})
export class UsuariosModule { }
