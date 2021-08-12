import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
// import { User } from 'firebase/auth/User';
import * as firebase from 'firebase';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';

// import { UserCredential } from firebase.auth.UserCredential;

@Injectable({ providedIn: 'root' })
export class AuthService implements OnInit {
    private tokenExpirationTimer: any;
    public userSubject = new BehaviorSubject<User | undefined>(undefined);
    constructor(private router: Router, public fireAuth: AngularFireAuth) {

    }

    public ngOnInit() {
    }

    signupUser(email: string, password: string) {
        return this.fireAuth.createUserWithEmailAndPassword(email, password)
            .then(
                (resData: firebase.default.auth.UserCredential) => {
                    if (resData!! && resData.user?.email!! && resData.user?.uid!!) {
                        return resData.user?.getIdToken().then(
                            (idToken: any) => {
                                return resData.user?.getIdTokenResult().then(
                                    (tokenResult: any) => {
                                        return this.handleAuthentication(
                                            (resData.user?.email) as string,
                                            (resData.user?.uid) as string,
                                            idToken,
                                            new Date(tokenResult.expirationTime)
                                        );
                                    }
                                );
                            }
                        );
                    } else {
                       throw new Error('User not recovered!');
                    }
                }
            ).catch(
                (error) => {
                    console.error(error);
                    return this.handleError(error);
                }
            );
    }

    signinUser(email: string, password: string) {
        return this.fireAuth.signInWithEmailAndPassword(email, password)
            .then(
                (resData: firebase.default.auth.UserCredential) => {
                    if (resData!! && resData.user?.email!! && resData.user?.uid!!) {
                        resData.user?.getIdToken().then(
                            (idToken: any) => {
                                resData.user?.getIdTokenResult().then(
                                    (tokenResult: any) => {
                                        return this.handleAuthentication(
                                            (resData.user?.email) as string,
                                            (resData.user?.uid) as string,
                                            idToken,
                                            new Date(tokenResult.expirationTime)
                                        );
                                    }
                                );
                            }
                        );
                    } else {
                        throw new Error('User not recovered!');
                    }
                }
            ).catch(
                (error) => {
                    console.error(error);
                    return this.handleError(error);
                }
            );

    }

    private autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expirationDate: Date
    ) {
        const user = new User(email, userId, token, expirationDate);
        this.userSubject.next(user);
        const expiresIn = expirationDate.getTime() - new Date().getTime();
        this.autoLogout(expiresIn * 1);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: firebase.default.auth.Error) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.code || !errorRes.message) {
            throw new Error(errorMessage);
        }
        switch (errorRes.code) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'This password is not correct.';
                break;
        }
        throw new Error(errorMessage);
    }

    autoLogin() {
        const userDataLocalStorage = localStorage.getItem('userData');
        if (!!userDataLocalStorage) {
            const userData = JSON.parse(userDataLocalStorage);
            if (!userData) {
                return;
            }
            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            );

            if (loadedUser.token) {
                this.userSubject.next(loadedUser);
                const expirationDuration =
                    new Date(userData._tokenExpirationDate).getTime() -
                    new Date().getTime();
                this.autoLogout(expirationDuration);
            }
        } else {
            return;
        }
    }

    public logout() {
        this.userSubject.next(undefined);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

}
