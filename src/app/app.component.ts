import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  // loadedFeature: string = 'recipe';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoLogin();
  }
  // Replaced with router handler
  // onNavigation(navigationInfo:{page: string}){
  //   this.loadedFeature=navigationInfo.page;
  // }
}
