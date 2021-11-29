import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {
  misMaterias = ['Alegebra II','Calculo Integral', 'Programacion I']
  solicitudes = [{nombre: 'Juan Romo Lopez', materia: 'Alegebra II'},{nombre: 'Luis Salazar Gonzalez', materia: 'Programacion I'},{nombre: 'Fernanda Rabling Muñoz', materia: 'Alegebra II'}]
  
  constructor() { }

  ngOnInit(): void {
  }

}
