import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import jwt_decode from 'jwt-decode';

import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoginGuard implements CanActivate {
  constructor(private authService: AuthService, private route : Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // this.isLoggedIn()
    return this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      const tokenPayload :any = jwt_decode(token);
      // console.log("login", tokenPayload);
      
      const now = new Date().getTime() / 1000;
      if (tokenPayload.exp  > now) {
        return true;
      }
    }
    this.route.navigate(['auth/login']);
    return false;
  }
  
}
