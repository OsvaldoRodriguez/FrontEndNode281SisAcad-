import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from '../core/core.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog'
import { ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast'
import {MessageService} from 'primeng/api'
import { FormsModule } from '@angular/forms';
import { WebModule } from '../web/web.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    FormsModule,
    WebModule
    
  ],
  providers :[MessageService], 
  exports : []
})
export class AdminModule { }
