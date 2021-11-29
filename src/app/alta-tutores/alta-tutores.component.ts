import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-alta-tutores',
  templateUrl: './alta-tutores.component.html',
  styleUrls: ['./alta-tutores.component.css']
})
export class AltaTutoresComponent implements OnInit {

  constructor(private firebaseS: FirebaseService,) { }

  ngOnInit(): void {
  }

  

}
