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
  solicitudes = [{nombre: 'Juan Romo Lopez', materia: 'Alegebra II'},{nombre: 'Luis Salazar Gonzalez', materia: 'Programacion I'},{nombre: 'Fernanda Rabling Muñoz', materia: 'Alegebra II'}]
  id_tutor = 0;
  mats = "";
  constructor(private firebaseS: FirebaseService) {
    let tut = JSON.parse(localStorage.getItem('usuario'));
    //console.log(tut.id);
    firebaseS.getUsuario(tut.id)
      .then(tutor => {
        console.log(tutor);
        
        this.getMaterias(tutor); 
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
        arax[i] = this.misMaterias[i]
      }
    }
    this.misMaterias = [];
    this.misMaterias = arax;
    console.log("borrado " + mat);
    console.log(this.misMaterias);
    this.firebaseS.quitarMateria(this.id_tutor,this.materias.indexOf(mat),mat)
  }

}
