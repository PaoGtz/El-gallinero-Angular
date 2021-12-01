import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../services/chats.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  text = ""; 
  constructor(public chat: ChatsService) { }

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
