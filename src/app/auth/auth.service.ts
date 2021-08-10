import * as firebase from 'firebase';
import { Injectable } from '../../../node_modules/@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router){

    }

    signupUser(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            );
    }

    signinUser(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    console.log(response);
                    this.router.navigate(['']);
                    return firebase.auth().currentUser.getIdToken().then()
                        .then(
                            (token: string) => this.token = token
                        )
                }

            )
            .catch(
                error => console.log(error)
            );
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
        //to not stay in authorized-only page
        this.router.navigate(['']);
    }

    getToken() {
        return this.token;
    }

    isAuthenticaded() {
        return this.token != null;
    }
}