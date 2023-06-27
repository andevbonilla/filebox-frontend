import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateJwtGuard implements CanActivate {

  constructor(private authService:AuthService,
              private router:Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

    return this.authService.renewToken().pipe(
      tap(resp=>{
        if (!resp) {
          this.router.navigateByUrl('/login')
        }
      })
    )

  }
  
}
