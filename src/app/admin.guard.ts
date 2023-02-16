import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.getCurrentUser();
    console.log('User: ', user);
    if (user?.role === 'admin') {
      console.log('User is an admin');
      return true;
    } else {
      this.router.navigate(['/loginpage']);
      return false;
    }
  }
}
