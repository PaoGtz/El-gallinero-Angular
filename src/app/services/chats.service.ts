import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  chats=[]; 

  constructor(private socket: SocketService) {
    this.onReceiveMessage(); 
   }

  sendMessage(messageInfo){
    this.chats.push(messageInfo); 
    this.socket.io.emit("sendMessage", messageInfo); 
  }

  onReceiveMessage(){
        this.socket.io.on("reveiceMessage", (messageInfo) => {
          messageInfo.messageType = 2; 
        this.chats.push(messageInfo);
    }); 
  }
}
