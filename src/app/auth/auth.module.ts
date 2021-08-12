import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [
       SignupComponent,
        SigninComponent,
        AuthComponent
    ],
    imports : [
        SharedModule,
        FormsModule,
        AuthRoutingModule,
        AngularFireModule.initializeApp(environment.firebase)
    ]
})
export class AuthModule {

}
