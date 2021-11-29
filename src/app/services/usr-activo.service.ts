import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsrActivoService {

  usuario; 
  tipoUsuario: string;
  alumno;
  coord;

  constructor() { }

  login(usr){

    this.usuario = {id:usr['id'],nombre:usr['nombre'],centro:usr['centro'],foto: usr['foto']}
    
    this.tipoUsuario = usr['estudiante']? "Estudiante":"Coordinador";

    if(this.tipoUsuario == 'Estudiante'){
      this.alumno= {semestre: usr['semestre'],tutor: usr['tutor']} 
    }
    else{
      this.coord ={puesto: usr['puesto']};
    }
  }
}
