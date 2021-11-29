import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { UsrActivoService } from '../services/usr-activo.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  tipoCuenta = "";
  usuario;
  alumno;
  coord;
  constructor(private usrActivo: UsrActivoService, private fbService: FirebaseService) { 
   this.usuario = this.usrActivo.usuario
   this.tipoCuenta = this.usrActivo.tipoUsuario
   if(this.tipoCuenta == 'Estudiante'){
    this.alumno= this.usrActivo.alumno
  }
  else{
    this.coord =this.usrActivo.coord
  }
  }

  cambioFoto(){
    var numero = this.usuario.foto == 1? 2: 1;
  
    this.fbService.cambiarFoto(numero,this.usuario.id).then(res =>
      this.usuario.foto = numero)
  }
  ngOnInit(): void {
  }

}
