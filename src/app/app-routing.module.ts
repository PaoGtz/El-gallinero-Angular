import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaTutoresComponent } from './alta-tutores/alta-tutores.component';
import { CoordinadoresComponent } from './coordinadores/coordinadores.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SesionComponent } from './sesion/sesion.component';
import { TutorComponent } from './tutor/tutor.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'sesion', component: SesionComponent},
  { path: 'tutor', component: TutorComponent},
  { path: 'altaCoord', component: CoordinadoresComponent},
  { path: 'altaTutores', component: AltaTutoresComponent},
  { path: 'chat', component: ChatComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'sesion'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
