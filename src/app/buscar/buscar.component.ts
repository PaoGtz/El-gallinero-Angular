import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { UsrActivoService } from '../services/usr-activo.service';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  usuario;
  alumno;
  solicitudEstado = "NoEnviada"
  
  constructor(private firebaseS: FirebaseService, private usrActivo: UsrActivoService,
    private feedback: FeedbackService) { 
    this.usuario = this.usrActivo.usuario
    this.alumno= this.usrActivo.alumno

    //Si no es tutor, checar si ha enviado solicitud
    if(!this.alumno.tutor){
        this.firebaseS.getSolicitudSerTutor(this.usuario.id).then(user =>{
          if(user){
            this.solicitudEstado = user['estado'];
          }
          else{
            this.solicitudEstado = "NoEnviada"
          }
        })
    }
  }

  materias = ['Programacion','Algebra I','Calculo Integral','Redaccion','Finanzas','Algebra II']
  tutores = [{nombre:'Paola Gutierrez',solicitud: false,img: 'mujer.png'}, {nombre:'Adriana Torres',solicitud: false,img: 'mujer.png'}, 
  {nombre:'Oscar Salas',solicitud: false,img: 'hombre.png'}, {nombre:'Alexia Flores',solicitud: false,img: 'mujer.png'}]

  nombre_tutor = '';
  envioSol = false;
  nombre_sol = false;
  nombre_index = 0;
  tutor__img = '';
  opcion = 'buscar';
  ngOnInit(): void {
  }

  setTutor(tutor,i){
    this.nombre_tutor = tutor.nombre;
    this.nombre_sol = tutor.solicitud;
    this.nombre_index = i;
    this.tutor__img = tutor.img;
  }

  changeSol(){
    
    this.tutores[this.nombre_index].solicitud = !this.tutores[this.nombre_index].solicitud
    this.nombre_sol = this.tutores[this.nombre_index].solicitud
  }

  solicitarSerTutor(){
    
    if(this.solicitudEstado == "NoEnviada"){
      this.firebaseS.añadirObjeto('/SOLICITUDESserTutor/',{id:this.usuario.id,estado:'pendiente'}).then(res=>{
      this.feedback.Exito("","Tu solicitud ha sido envida")
      this.solicitudEstado = 'pendiente'
      })
    }
    else{
      this.feedback.Mensaje("","Ya haz enviado una solicitud")
    }
  }

}
