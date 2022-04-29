import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from "../auth.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TechnicalGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
    console.log('TechnicalGuard');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user.pipe(
      take(1),
      map(user => user?.profile === 'technical'),
      //map(user => !(!user || user.profile !== 'technical')),
      tap(isTechnical => {
        if (!isTechnical) {
          console.error('Access denied - Technicals only');
        }
      })
    );
  }

}
