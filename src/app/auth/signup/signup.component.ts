import { Component, OnInit } from '@angular/core';
// import { auth } from 'firebase';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private isLoading = false;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);
    form.reset();

  }

}
