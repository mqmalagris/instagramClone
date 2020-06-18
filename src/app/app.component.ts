import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3';

  ngOnInit(): void {

    var firebaseConfig = {
      apiKey: "AIzaSyAn_2CCgXKwJrFMWQ9rj6moQpZ_FFFEWBg",
      authDomain: "jta-instagram-clone-2f4d8.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-2f4d8.firebaseio.com",
      projectId: "jta-instagram-clone-2f4d8",
      storageBucket: "jta-instagram-clone-2f4d8.appspot.com",
      messagingSenderId: "640207690050",
      appId: "1:640207690050:web:e2cfd93e427d886f5610db",
      measurementId: "G-KCF5ED6Z8J"
    };

    firebase.initializeApp(firebaseConfig);
  }
}
