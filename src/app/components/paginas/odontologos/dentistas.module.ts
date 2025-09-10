import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DentistaRoutingModule } from './dentistas-routing.module';

import { DentistaListComponent } from './components/dentista-list/dentista-list.component';
import { DentistaDetailComponent } from './components/dentista-detail/dentista-detail.component';
import { DentistaEditComponent } from './components/dentista-edit/dentista-edit.component';
import { DentistaNewComponent } from './components/dentista-new/dentista-new.component';



@NgModule({
  declarations: [
    DentistaListComponent,
    DentistaDetailComponent,
    DentistaEditComponent,
    DentistaNewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DentistaRoutingModule
  ]
})
export class DentistasModule { }
