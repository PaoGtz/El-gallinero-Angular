import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

// Initialize Firebase

export class FirebaseService {


  constructor(private db: AngularFireDatabase) {
  }

  añadirUsuario(usr) {

    //Checar si ya esta
    return new Promise((resolve,reject)=>{
      let sub:Subscription = this.db.object('/USUARIOS/' + usr.id).valueChanges().subscribe((user)=>{
        sub.unsubscribe();
        //si ya existe un usuario con ese id
        if(user){ reject('Usuario id:'+user['id'] + 'ya existe')}
        else{
          this.db.object('/USUARIOS/' + usr.id).update(usr)
          .then(res => {
            resolve(true);
            return true;
          })
          .catch(err => {
            return err;
          });
          
        }
      }
     
    )})
}

cambiarFoto(nuevoValor,id){
  return this.db.object('/USUARIOS/' + id).update({foto:nuevoValor})
        .then(res => {
          return true;
        })
        .catch(rej => {
          return false;
        });
}

  añadirObjeto(tabla, objeto) {

    return this.db.object(tabla + objeto.id).update(objeto)
    .then(res => {

      return true;
    })
    .catch(err => {
      return err;
    });
     
  }

  inicioSesion(userId) {
    return new Promise((resolve,reject)=>{
      let sub:Subscription = this.db.object('/USUARIOS/' + userId).valueChanges().subscribe((user)=>{
        sub.unsubscribe();
        resolve(user)
      },(err)=>{
        sub.unsubscribe();
        reject(err)
      })
    })
    
  }

  getCoordinadores(){
    return new Promise((resolve,reject)=>{
      let sub:Subscription = this.db.object('/USUARIOS/').valueChanges().subscribe((users)=>{
        sub.unsubscribe();
        resolve(users)
      },(err)=>{
        sub.unsubscribe();
        reject(err)
      })
    })
  }

  getSolicitudSerTutor(userId) {
    return new Promise((resolve,reject)=>{
      let sub:Subscription = this.db.object('/SOLICITUDESserTutor/' + userId).valueChanges().subscribe((user)=>{
        sub.unsubscribe();
        resolve(user)
      },(err)=>{
        sub.unsubscribe();
        reject(err)
      })
    })
    
  }

  getSolicitudesSerTutor(){
    return new Promise((resolve,reject)=>{
      let sub:Subscription = this.db.object('/SOLICITUDESserTutor/').valueChanges().subscribe((users)=>{
        sub.unsubscribe();
        resolve(users)
      },(err)=>{
        sub.unsubscribe();
        reject(err)
      })
    })
  }

  getUsuario(userId){
    return new Promise((resolve,reject)=>{
      let sub:Subscription = this.db.object('/USUARIOS/' + userId).valueChanges().subscribe((user)=>{
        sub.unsubscribe();
        resolve(user)
      },(err)=>{
        sub.unsubscribe();
        reject(err)
      })
    })
  }

  habilitarTutor(id){
    return this.db.object('/USUARIOS/' + id).update({tutor:true})
          .then(res => {
            this.db.object('/SOLICITUDESserTutor/' + id).remove()
            .then(res => {
              return true;
            })
            .catch(rej => {
              return false;
            });
          })
          .catch(rej => {
            return false;
          });
  }

  
  RechazarSolSerTutor(id){
    return this.db.object('/SOLICITUDESserTutor/' + id).remove()
          .then(res => {
            return true;
          })
          .catch(rej => {
            return false;
          });
  }

  


}
