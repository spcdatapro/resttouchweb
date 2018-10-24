import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService as AuthGuard } from './services/authguard.service';

import { HomePage } from './pages/home/home.page';
import { MenuPage } from './pages/menu/menu.page';
import { OrganizacionPage } from './pages/organizacion/organizacion.page';
import { EmpresaPage } from './pages/empresa/empresa.page';
import { SedePage } from './pages/sede/sede.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage, canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'menu', component: MenuPage, canActivate: [AuthGuard] },
  { path: 'organizacion', component: OrganizacionPage, canActivate: [AuthGuard] },
  { path: 'empresa', component: EmpresaPage, canActivate: [AuthGuard] },
  { path: 'sede', component: SedePage, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
