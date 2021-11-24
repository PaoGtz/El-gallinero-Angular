import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor() { }

  Error(title, message){
 
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
    })

  }

  Exito(title, message){
    Swal.fire(
      title,
      message,
      'success'
    )
  }
}
