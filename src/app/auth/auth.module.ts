import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [
       SignupComponent,
        SigninComponent
    ],
    imports : [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        AngularFireModule.initializeApp(environment.firebase)
    ]
})
export class AuthModule {

}
