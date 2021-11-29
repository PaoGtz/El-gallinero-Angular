import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  constructor() { }
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

}
