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
    this.getTutores()
  }

  materias1 = []
  tutores1 = []

  materias = ['Algebra I', 'Algebra II', 'Algebra Lineal', 'Calculo Diferencial', 'Calculo Integral', 'Calculo Vectorial', 'Ecuaciones Diferenciales', 'Programacion I', 'Programacion II', 'Programacion III', 'Estructuras de Datos', 'Dart Flutter', 'React Native', 'Angular', 'Redes', 'Circuitos Electronicos']
  tutores = []
  id_tuts = []

  nombre_tutor = '';
  envioSol = false;
  nombre_sol = false;
  nombre_index = 0;
  tutor__img = '';
  opcion = 'buscar';
  materia_sel = '';
  ngOnInit(): void {
  }

  setTutor(tutor,i){
    this.nombre_tutor = tutor.nombre;
    this.nombre_sol = tutor.solicitud;
    this.nombre_index = i;
    this.tutor__img = tutor.img;
    console.log(this.id_tuts[this.nombre_index]);
    
  }

  changeSol(){
    
    this.tutores[this.nombre_index].solicitud = !this.tutores[this.nombre_index].solicitud
    this.nombre_sol = this.tutores[this.nombre_index].solicitud
    
    var us = JSON.parse(localStorage.getItem('usuario'));
    //console.log(us.id);
    
    this.firebaseS.solicitarTutor(this.id_tuts[this.nombre_index],us.id,this.materia_sel,us.nombre)
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

  getFiltroM(){
    var tuts = []
    this.id_tuts = []
    this.tutores = []

    console.log(this.materia_sel);
    this.firebaseS.getFiltroM(this.materia_sel)
      .then((res: any) =>{
        if(res){
          for (const property in res) {
            tuts.push({id: res[property]['id']})
           }
           for (let i = 0; i < tuts.length; i++) {
             this.id_tuts.push(tuts[i].id)
           }
           console.log(this.id_tuts);
           
        }        
        for (let i = 0; i < this.id_tuts.length; i++) {
          console.log(res[this.id_tuts[i]]);
          this.tutores.push(res[this.id_tuts[i]])
        }
        console.log(this.tutores);
        
      })
      .catch(rej => console.error())
  }

  getTutores(){

  }

}
