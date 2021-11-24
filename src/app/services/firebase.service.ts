import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})

// Initialize Firebase

export class FirebaseService {

  alumnos: any;

  constructor(private db: AngularFireDatabase) {
    this.alumnos = this.db.list("Alumnos");
  }

  añadirUsuario(nuevoUsuario, id) {
    this.alumnos.push(nuevoUsuario)
  }

  inicioSesion(userId) {
    /*
    this.db.list("Alumnos",{query:{id: 198300}}).valueChanges().subscribe((data)=>
    {console.log(data)}
    )*/
    
  }


}
