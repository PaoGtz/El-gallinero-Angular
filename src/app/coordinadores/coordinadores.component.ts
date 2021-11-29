import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-coordinadores',
  templateUrl: './coordinadores.component.html',
  styleUrls: ['./coordinadores.component.css']
})
export class CoordinadoresComponent implements OnInit {

  constructor(private firebaseS: FirebaseService, private feedback: FeedbackService,) {this.getCord() }
  coord = {id:null,nombre: "",passw:"",centro:""}
  centros = ["Centro de Ciencias Básicas","Centro de Ciencias de la Salud","Centro de Ciencias Agropecuarias", "Centro de Ciencias de Diseño y de la Construcción",
              "Centro de Ciencias de la Ingeniería", "Centro de Ciencias Económicas y Administrativas", "Centro de Ciencias Empresariales",
              "Centro de Ciencias Sociales y Humanidades", "Centro de las Artes y la Cultura","otro.."]

  ngOnInit(): void {
  }

  addCoord(){
    //Campos de usuario vacios
    if(this.coord.nombre == "" || this.coord.passw == "" || 
    this.coord.centro == "", this.coord.id < 100000){
      this.feedback.Error("ERROR EN DATOS","asegurate que los campos esten correctos")
      return
    }

    //DATOS COMPLETOS, agregar usuario
    let nuevo = {id: this.coord.id,nombre: this.coord.nombre ,foto: 1,password: this.coord.passw, 
      centro: this.coord.centro, estudiante: false, puesto: "coord"} 
    this.firebaseS.añadirUsuario(nuevo)
    .then(succes => 
      {
        //reiniciar variables
        this.coord = {id:null,nombre: "",passw:"",centro:""}
        this.feedback.Exito("Exito","Coordinador Registrado")
        this.getCord()
      })
    .catch((err)=>{
        this.feedback.Error("ERROR", err)
    })
  }

  coordinadores= []
  getCord(){
    this.firebaseS.getCoordinadores().then((res:any)=>{
      for (const property in res) {
        if(!res[property]['estudiante']){
          this.coordinadores.push({
            id: res[property]['id'], nombre: res[property]['nombre'], foto: res[property]['foto'], centro: res[property]['centro']})
        }
        }
    })
  }

}
