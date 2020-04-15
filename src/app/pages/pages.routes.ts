import { RouterModule, Routes } from '@angular/router';

import { LoginGuardGuard } from '../services/guards/login-guard.guard';

import { PagesComponent } from './pages.component';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medicos/medico.component';
import { MedicosComponent } from './medicos/medicos/medicos.component';
import { AdminGuard } from '../services/guards/admin.guard';

const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashoard' } },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'Barra de Progreso' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficos' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJS' } },
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes' } },
    { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
    { path: 'usuario', component: UsuariosComponent, canActivate: [AdminGuard], data: { titulo: 'Mantenimiento de Usuarios' } },
    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];


export const PagesRoutes = RouterModule.forChild(pagesRoutes);


// export const  PagesRoutes = RouterModule.forChild(pagesRoutes);

