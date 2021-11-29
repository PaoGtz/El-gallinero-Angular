import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { UsrActivoService } from '../services/usr-activo.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  tipoCuenta = "";
  usuario;
  alumno;
  coord;
  puesto ="";
  constructor(private usrActivo: UsrActivoService,private router: Router,) { 
    var datoUsuario = JSON.parse(localStorage.getItem('usuario'));
    if(datoUsuario){
      this.usrActivo.login(datoUsuario);
    }
    else{
      this.router.navigate(['']);
    }
    this.usuario = this.usrActivo.usuario
     this.tipoCuenta = this.usrActivo.tipoUsuario
     if(this.tipoCuenta == 'Estudiante'){
      this.alumno= this.usrActivo.alumno
    }
    else{
      this.puesto =this.usrActivo.coord.puesto
    }
  }

  cerrarSesion(){
    localStorage.removeItem('usuario');
    this.router.navigate(['']);
  }
  
  contenido = 'perfil';
  
  ngOnInit(): void {
  }
  menudesplegue(){
    
  
      $(".desplegable").slideToggle(400);
  
  }
}

