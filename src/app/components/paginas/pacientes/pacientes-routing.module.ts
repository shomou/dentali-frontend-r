import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesListComponent } from './components/pacientes-list/pacientes-list.component';
import { PacientesNewComponent } from './components/pacientes-new/pacientes-new.component';
import { PacientesEditComponent } from './components/pacientes-edit/pacientes-edit.component';
import { PacientesDetailComponent } from './components/pacientes-detail/pacientes-detail.component';


const routes: Routes = [
  {
    path: '', // La ruta raíz dentro de este módulo (ej. /pacientes)
    component: PacientesListComponent
  },
  {
    path: 'nuevo',
    component: PacientesNewComponent
  },
  {
    path: 'editar/:id',
    component: PacientesEditComponent
  },

  {
    path: ':id',
    component: PacientesDetailComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }