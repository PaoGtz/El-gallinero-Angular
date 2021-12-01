import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../services/chats.service';
import { UsrActivoService } from '../services/usr-activo.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  tipoCuenta = "";
  usuario;
  alumno;
  coord;
  text = ""; 
  constructor(public chat: ChatsService, private usrActivo: UsrActivoService, private fbService: FirebaseService) {

    this.usuario = this.usrActivo.usuario
    this.tipoCuenta = this.usrActivo.tipoUsuario

  }

  ngOnInit(): void {
  }

  sendMessage(){
    let messageInfo = {
      text: this.text,
      messageType: 1
    }; 
    this.chat.sendMessage(messageInfo); 
    this.text = ""; 
  }

}
