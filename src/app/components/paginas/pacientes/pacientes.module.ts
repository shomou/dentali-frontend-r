import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesListComponent } from './components/pacientes-list/pacientes-list.component';
import { PacientesNewComponent } from './components/pacientes-new/pacientes-new.component';
import { PacientesEditComponent } from './components/pacientes-edit/pacientes-edit.component';
import { PacientesDetailComponent } from './components/pacientes-detail/pacientes-detail.component';


@NgModule({
  declarations: [
    PacientesListComponent,
    PacientesNewComponent,
    PacientesEditComponent,
    PacientesDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PacientesRoutingModule
  ]
})
export class PacientesModule { }