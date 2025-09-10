import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../app/components/layout/main-layout/main-layout.component'
const routes: Routes = [ 
  // Ruta principal que usa el MainLayoutComponent
  // Todas las rutas hijas se renderizarán dentro de este layout
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard], // Futuro: aquí irá un guard para proteger las rutas
    children: [
      {
        path:'',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./components/paginas/dashboard/dashboard.module').then(m => m.DashboardModule)
      }, 
      {
        path: 'pacientes',
        loadChildren: () => import('./components/paginas/pacientes/pacientes.module').then(m => m.PacientesModule)
      },
      {
        path: 'dentistas',
        loadChildren: () => import('./components/paginas/odontologos/dentistas.module').then(m => m.DentistasModule)
      }]
   } 
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
