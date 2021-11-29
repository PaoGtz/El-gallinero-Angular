import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FeedbackService } from '../services/feedback.service';
import { UsrActivoService } from '../services/usr-activo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {

  constructor(private firebaseS: FirebaseService, private feedback: FeedbackService,
    private usrActivo: UsrActivoService,private route: ActivatedRoute,
    private router: Router,) { }

  centros = ["Centro de Ciencias Básicas","Centro de Ciencias de la Salud","Centro de Ciencias Agropecuarias", "Centro de Ciencias de Diseño y de la Construcción",
              "Centro de Ciencias de la Ingeniería", "Centro de Ciencias Económicas y Administrativas", "Centro de Ciencias Empresariales",
              "Centro de Ciencias Sociales y Humanidades", "Centro de las Artes y la Cultura"]
  registrar = false;
  nuevousr = {idnuevo: null,nombre: "",contra: "", centro: "",semestre: null}
  login = {usrid: "", passw: ""}

  ngOnInit(): void {
  }


  iniciarSesion(){
    
    this.firebaseS.inicioSesion(this.login.usrid)
    .then((user)=>{
      //si si encontro un usuario con ese id checa contraseña que sea igual
      if(user['password'] == this.login.passw){
        this.usrActivo.login(user);
        //Guardar el local Storage
        localStorage.setItem('usuario', JSON.stringify(user))
        this.router.navigate([`menu`]);
      }else{
        this.feedback.Error("","Contraseña incorrecta")
      }
    })
    .catch((err)=>{
      this.feedback.Error("","No existe usuario")
    })
  }

  registrarUsuario(){

    //Campos de usuario vacios
    if(this.nuevousr.nombre == "" || this.nuevousr.contra == "" || 
    this.nuevousr.centro == "", this.nuevousr.idnuevo < 100000){
      this.feedback.Error("ERROR EN DATOS","asegurate que los campos esten correctos")
      return
    }

    //DATOS COMPLETOS, agregar usuario
    let nuevo = {id: this.nuevousr.idnuevo,nombre: this.nuevousr.nombre ,foto: 1,semestre: this.nuevousr.semestre, password: this.nuevousr.contra, centro: this.nuevousr.centro, estudiante: true, tutor: false} 
    this.firebaseS.añadirUsuario(nuevo)
    .then(succes => 
      {
        //reiniciar variables
        this.nuevousr = {idnuevo: null,nombre: "",contra: "", centro: "",semestre: null}
        this.registrar = false
        this.feedback.Exito("Exito","Bienvenido al Gallinero")
      })
    .catch((err)=>{
        this.feedback.Error("ERROR", err)
    })

    
  }

}
