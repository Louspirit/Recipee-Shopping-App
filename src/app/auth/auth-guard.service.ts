import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '../../../node_modules/@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '../../../node_modules/@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isAuthenticaded();
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.authService.isAuthenticaded();
    }
}
