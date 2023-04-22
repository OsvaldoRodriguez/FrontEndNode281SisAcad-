import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { PersonaComponent } from './persona/persona.component';

const routes: Routes = [
  {
    path: 'listar-usuario',
    component : ListarComponent
  },
  {
    path: 'persona',
    component : PersonaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
