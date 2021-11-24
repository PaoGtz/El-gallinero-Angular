import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SesionComponent } from './sesion/sesion.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'sesion', component: SesionComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'sesion'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
