import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-alta-tutores',
  templateUrl: './alta-tutores.component.html',
  styleUrls: ['./alta-tutores.component.css']
})
export class AltaTutoresComponent implements OnInit {

  constructor(private firebaseS: FirebaseService, private feedback: FeedbackService) {
    this.getSolicitudesSerTutor();
   }

  ngOnInit(): void {
  }

  listaSolicitudes = [];
  showMsg = true;

  getSolicitudesSerTutor(){
    var idSolicitudes = [];
    this.listaSolicitudes = [];

    
    this.firebaseS.getSolicitudesSerTutor().then((res:any) =>{
      if(res){
        
        for (const property in res) {
          idSolicitudes.push({id: res[property]['id']})
         }
         idSolicitudes.forEach(sol => {
           this.firebaseS.getUsuario(sol.id).then(usuario=>{
             this.listaSolicitudes.push(usuario);
           })
         })
         this.showMsg = false
      }
      
    })

  }

  confirmarSol(id,nombre){
    this.firebaseS.habilitarTutor(id).then(res=>
      {this.feedback.Mensaje("","Solicitud de " + nombre + " Aceptada")
      this.getSolicitudesSerTutor();});
    
  }
  rechazarSol(id,nombre){
    this.firebaseS.RechazarSolSerTutor(id).then(res=>
      {this.feedback.Mensaje("","Solicitud de " + nombre + " rechazada")
      this.getSolicitudesSerTutor();});
    
  }

  

}
