import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasListComponent } from './components/citas-list/citas-list.component';
import { CitasNewComponent } from './components/citas-new/citas-new.component';
import { CitasEditComponent } from './components/citas-edit/citas-edit.component';
import { CitasDetailComponent } from './components/citas-detail/citas-detail.component';

@NgModule({
    declarations: [
        CitasListComponent,
        CitasNewComponent,
        CitasEditComponent,
        CitasDetailComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CitasRoutingModule
    ]
})
export class CitasModule { }