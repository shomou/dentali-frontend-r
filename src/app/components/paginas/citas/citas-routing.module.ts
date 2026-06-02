import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasDetailComponent } from './components/citas-detail/citas-detail.component'
import { CitasEditComponent } from './components/citas-edit/citas-edit.component'
import { CitasListComponent } from './components/citas-list/citas-list.component'
import { CitasNewComponent } from './components/citas-new/citas-new.component'

const routes: Routes = [
    {
        path: '',
        component: CitasListComponent
    },
    {
        path: 'nueva',
        component: CitasNewComponent
    },
    {
        path: 'editar/:id',
        component: CitasEditComponent
    },
    {
        path: ':id',
        component: CitasDetailComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CitasRoutingModule {}


