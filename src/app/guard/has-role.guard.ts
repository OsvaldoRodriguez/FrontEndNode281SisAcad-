import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../core/services/usuarios.service';
import { AuthService } from '../core/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  constructor(private authService : AuthService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

    // console.log("rol q ue tengo, ", rol_user);
    var mis_roles : string[] = []
    mis_roles = this.authService.getRol();
    const roles_requeridos = route.data?.['roles'];
    // console.log("roles requeridos", roles_requeridos);
    // console.log("mis roles", mis_roles);
    
    if (roles_requeridos.some( (r : string) => mis_roles.includes(r))) {
      return true;
    }
    alert("No tiene permisos")
    return false;
  }
}

