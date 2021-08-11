import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
// import { User } from 'firebase/auth/User';
import * as firebase from 'firebase';
import { throwError } from 'rxjs';
import { User } from './user.model';
// import { UserCredential } from firebase.auth.UserCredential;

@Injectable({ providedIn: 'root' })
export class AuthService implements OnInit {
    private tokenExpirationTimer: any;
    constructor(private router: Router, public fireAuth: AngularFireAuth) {

    }

    public ngOnInit() {
        // this.fireAuth.user.subscribe(() => {
        //     (user: User) => {
        //         this.handleAuthentication2(user);
        //     };
        // });
    }

    signupUser(email: string, password: string) {
        this.fireAuth.createUserWithEmailAndPassword(email, password)
        .then(
            (resData: firebase.default.auth.UserCredential) => {
                if (resData!! && resData.user?.email!! && resData.user?.uid!!) {
                    resData.user?.getIdToken().then(
                        idToken => {
                            resData.user?.getIdTokenResult().then(
                                tokenResult => {
                                    this.handleAuthentication(
                                        (resData.user?.email) as string,
                                        (resData.user?.uid) as string,
                                        idToken,
                                        new Date(tokenResult.expirationTime).getTime() - new Date().getTime()
                                    );
                                }
                                );
                            }
                    );
                } else {
                    throwError('User not recovered!');
                }
            }
        ).catch(
            (error) => { console.log(error); }
        );
        // .catch(
        //     (error: any) => console.log(error)
        // );
        // .then(
        //     resData => {
        //         this.handleAuthentication(
        //             resData.email,
        //             resData.localId,
        //             resData.idToken,
        //             +resData.expiresIn
        //         );
        //     });
        // return firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .catch(
        //         error => console.log(error)
        //     );
    }

    signinUser(email: string, password: string) {
        this.fireAuth.signInWithEmailAndPassword(email, password)
            .then(
                (resData: firebase.default.auth.UserCredential) => {
                    if (resData!! && resData.user?.email!! && resData.user?.uid!!) {
                        resData.user?.getIdToken().then(
                            idToken => {
                                resData.user?.getIdTokenResult().then(
                                    tokenResult => {
                                        this.handleAuthentication(
                                            (resData.user?.email) as string,
                                            (resData.user?.uid) as string,
                                            idToken,
                                            new Date(tokenResult.expirationTime).getTime() - new Date().getTime()
                                        );
                                    }
                                    );
                                }
                        );
                    } else {
                        throwError('User not recovered!');
                    }
                }
            ).catch(
                (error) => { console.log(error); }
            );

    }

    private autoLogout(expirationDuration: number ) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    // private handleAuthentication2(userLoggedIn: User) {

    //     let expirationDate: string;
    //     userLoggedIn.getIdTokenResult().then(
    //         (tokenResult: any) => {
    //             expirationDate = tokenResult.expirationTime;
    //             const expiresIn = new Date().getTime() + new Date(expirationDate).getTime();

    //             this.autoLogout(expiresIn);
    //             localStorage.setItem('userData', JSON.stringify(userLoggedIn));
    //         });
    // }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
     ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    // private handleError(errorRes: HttpErrorResponse); {
    //     let errorMessage = 'An unknown error occurred!';
    //     if (!errorRes.error || !errorRes.error.error) {
    //         return throwError(errorMessage);
    //     }
    //     switch (errorRes.error.error.message) {
    //         case 'EMAIL_EXISTS':
    //             errorMessage = 'This email exists already';
    //             break;
    //         case 'EMAIL_NOT_FOUND':
    //             errorMessage = 'This email does not exist.';
    //             break;
    //         case 'INVALID_PASSWORD':
    //             errorMessage = 'This password is not correct.';
    //             break;
    //     }
    //     return throwError(errorMessage);
    // }

    public logout() {
        this.fireAuth.signOut().catch((error: any) => { console.log(error); });
        // to not stay in authorized-only page
        this.router.navigate(['']);
    }
}
