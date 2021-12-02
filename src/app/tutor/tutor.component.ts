import { AttrAst } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {
  materias = ['Algebra I', 'Algebra II', 'Algebra Lineal', 'Calculo Diferencial', 'Calculo Integral', 'Calculo Vectorial', 'Ecuaciones Diferenciales', 'Programacion I', 'Programacion II', 'Programacion III', 'Estructuras de Datos', 'Dart Flutter', 'React Native', 'Angular', 'Redes', 'Circuitos Electronicos']
  misMaterias = []
  solicitudes = []
  id_tutor = 0;
  mats = "";
  constructor(private firebaseS: FirebaseService) {
    let tut = JSON.parse(localStorage.getItem('usuario'));
    //console.log(tut.id);
    this.id_tutor = tut.id
    firebaseS.getUsuario(tut.id)
      .then(tutor => {
        console.log(tutor);
        this.getMaterias(tutor); 
        this.getSolicitudes()
      })
      .catch(rej => console.error()
      );
       
   }

  ngOnInit(): void {
  }

  setMateria(mat){
    console.log(mat);
    this.misMaterias.push(mat);
    this.firebaseS.setMateria(this.id_tutor,this.materias.indexOf(mat),mat);
  }

  getMaterias(tutor){
    console.log(tutor.id);
    this.id_tutor = tutor.id;
    this.mats = tutor.materias;
    console.log(this.mats);
    for (let i = 0; i < this.materias.length; i++) {
      if (this.mats[i] != null) {
        //console.log('entro');
        this.misMaterias.push(JSON.parse(JSON.stringify(this.mats[i]['mat'])));
        //console.log(JSON.parse(JSON.stringify(this.mats[i]['mat'])));
      }
    }
    console.log(this.misMaterias);
  }

  borrarM(mat){
    let arax = [];
    for (let i = 0; i < this.misMaterias.length; i++) {
      if (mat == this.misMaterias[i]) {
        this.misMaterias[i] = "$";
      }
      if (this.misMaterias[i] != "$") {
        arax.push(this.misMaterias[i])
      }
    }
    this.misMaterias = [];
    this.misMaterias = arax;
    console.log("borrado " + mat);
    console.log(this.misMaterias);
    this.firebaseS.quitarMateria(this.id_tutor,this.materias.indexOf(mat),mat)
  }

  getSolicitudes(){
    var sol = []
    var id_tuts = []
    this.solicitudes = []

    this.firebaseS.getSolicitudes(this.id_tutor)
      .then((res:any) => {
        console.log(res);
        if(res){
          for (const property in res) {
            sol.push({id: res[property]['id']})
          }
          console.log(sol);
          for (let i = 0; i < sol.length; i++) {
            id_tuts.push(sol[i].id)
          }
          console.log(id_tuts);
          
          for (let i = 0; i < id_tuts.length; i++) {
            console.log(i);
            
            this.solicitudes.push(res[id_tuts[i]])
          }
          console.log(this.solicitudes);
          
        }
        return true
      })
      .catch(rej => {
        return false
      })
  }

  rechazarSol(id_al,mat){
    let arax = []
    for (let i = 0; i < this.solicitudes.length; i++) {
      if (id_al == this.solicitudes[i].id) {
        this.solicitudes[i] = '$';
      }
      if (this.solicitudes[i] != '$') {
        arax.push(this.solicitudes[i]);
      }
    }
    this.solicitudes = []
    this.solicitudes = arax
    
    this.firebaseS.rechazarSolicitud(this.id_tutor,id_al,mat);
  }

}
