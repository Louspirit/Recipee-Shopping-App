import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
 // loadedFeature: string = 'recipe';

ngOnInit(){
  //Set up the credentials
  firebase.initializeApp({
    apiKey: "AIzaSyDsdURyol791MsRThnGwKI95U029PqtFgc",
    authDomain: "ng-recipee-shopping.firebaseapp.com"
  })
}
 // Replaced with router handler
  // onNavigation(navigationInfo:{page: string}){
  //   this.loadedFeature=navigationInfo.page;
  // }
}
