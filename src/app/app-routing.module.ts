import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../app/components/layout/main-layout/main-layout.component'
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  // Ruta de Login (sin protección)
  {
    path: 'login',
    component: LoginComponent
  },
  // Ruta principal que usa el MainLayoutComponent
  // Todas las rutas hijas se renderizarán dentro de este layout
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard], // Proteger todas las rutas aquí
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
   },
  // Wildcard route (redirigir a login)
  { path: '**', redirectTo: '/login' }
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
