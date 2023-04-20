import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditoriasComponent } from './auditorias/auditorias.component';

const routes: Routes = [
  {
    path : 'auditorias',
    component : AuditoriasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditoriaRoutingModule { }
