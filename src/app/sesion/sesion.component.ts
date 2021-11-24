import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {

  constructor(private firebaseS: FirebaseService, private feedback: FeedbackService) { }

  centros = ["Centro de Ciencias de la Salud","Centro de Ciencias Agropecuarias", "Centro de Ciencias de Diseño y de la Construcción",
              "Centro de Ciencias de la Ingeniería", "Centro de Ciencias Económicas y Administrativas", "Centro de Ciencias Empresariales",
              "Centro de Ciencias Sociales y Humanidades", "Centro de las Artes y la Cultura"]
  registrar = false;
  nuevousr = {idnuevo: 0,nombre: "",contra: "", centro: ""}
  login = {usrid: "", passw: ""}

  ngOnInit(): void {
  }


  iniciarSesion(){
    this.firebaseS.inicioSesion(this.login.usrid)
  }

  registrarUsuario(){

    //Campos de usuario vacios
    if(this.nuevousr.nombre == "" || this.nuevousr.contra == "" || 
    this.nuevousr.centro == "", this.nuevousr.idnuevo < 100000){
      this.feedback.Error("ERROR EN DATOS","asegurate que los campos esten correctos")
      return
    }
    //DATOS CORRECTOS, agregar usuario
    let nuevo = {id: this.nuevousr.idnuevo,nombre: this.nuevousr.nombre , password: this.nuevousr.contra, centro: this.nuevousr.centro, estudiante: true, tutor: false} 
    this.firebaseS.añadirUsuario(nuevo,nuevo.id);

    //reiniciar variables
    this.nuevousr = {idnuevo: 0,nombre: "",contra: "", centro: ""}
    this.registrar = false
    this.feedback.Exito("Exito","Bienvenido al Gallinero")
  }

}
