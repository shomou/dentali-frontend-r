import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DentistaListComponent } from './components/dentista-list/dentista-list.component';
import { DentistaDetailComponent } from './components/dentista-detail/dentista-detail.component';
import { DentistaEditComponent } from './components/dentista-edit/dentista-edit.component';
import { DentistaNewComponent } from './components/dentista-new/dentista-new.component';

const routes: Routes =[
    {path: '', component: DentistaListComponent},
    {path:'nuevo', component: DentistaNewComponent},
    {path: 'editar/:id', component: DentistaEditComponent},
    {path: ':id', component: DentistaDetailComponent}
];


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DentistaRoutingModule{}