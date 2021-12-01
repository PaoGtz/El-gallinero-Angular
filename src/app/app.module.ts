import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { SesionComponent } from './sesion/sesion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { BuscarComponent } from './buscar/buscar.component';
import { AngularFireModule } from '@angular/fire';
import { TutorComponent } from './tutor/tutor.component';
import { CoordinadoresComponent } from './coordinadores/coordinadores.component';
import { AltaTutoresComponent } from './alta-tutores/alta-tutores.component';
import { ChatComponent } from './chat/chat.component';

const firebaseConfig = {
  apiKey: "AIzaSyCoscYdJv2urd-66YjdC9l7ARNl1mAW6BA",
  authDomain: "el-gallinero-a0995.firebaseapp.com",
  projectId: "el-gallinero-a0995",
  storageBucket: "el-gallinero-a0995.appspot.com",
  messagingSenderId: "1042954986609",
  appId: "1:1042954986609:web:4e325b21015f91b77ae7d0",
  measurementId: "G-X62R7PFMB2"
};

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    SesionComponent,
    PerfilComponent,
    BuscarComponent,
    TutorComponent,
    CoordinadoresComponent,
    AltaTutoresComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule, 
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
