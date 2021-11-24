import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }
  likeup = '';
  publicaciones = [{nombre:'El Álamo',foto:'alamo.jpg',publica:'alamo p.jpg',like:false},
  {nombre:'Café Punta del Cielo',foto:'cafe pcfoto.jpg',publica:'cafe pc.jpg',like:false},{nombre:'Casa Corazón',foto:'ccorazon.jpg',publica:'ccorazon p2.jpg',like:false},
  {nombre:'El Álamo',foto:'alamo.jpg',publica:'alamo p2.jpg',like:false},{nombre:'Casa Corazón',foto:'ccorazon.jpg',publica:'ccorazon p.jpg',like:false},]
  ngOnInit(): void {
  }

  like(i) {
    this.publicaciones[i].like = !this.publicaciones[i].like
    
  }

}
