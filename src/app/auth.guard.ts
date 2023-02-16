import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  data_type:any;
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route.data['allowedRoles'],this.authService.isAuthenticated())
    this.data_type=route.data['allowedRoles']
    const allowedRoles = route.data['allowedRoles'];
      // Check if the user is authenticated
      if (this.authService.isAuthenticated() || localStorage.getItem('isLoggedIn') === 'true') {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          const currentRole = currentUser.role;
          // Check if the current role is in the list of allowed roles
          if (allowedRoles.includes(currentRole)) {
            return true;
          } else {
            alert('unauthorized');
            return false;
          }
        } else {
         
          return true;
        }
        return true;
      }else if(localStorage.getItem('isLoggedIn') === 'false1') {
        // If the user is not authenticated, navigate to the login page
        // alert('unauthorized');
            return true;
      } else{
        this.router.navigate(['/loginpage']);
        return false;
      }
    // if (this.authService.isAuthenticated() || localStorage.getItem('isLoggedIn') === 'true') {
    //   const allowedRoles = route.data['allowedRoles'];
    //   if (allowedRoles.includes(this.authService.getCurrentUser()?.role)) {
    //     return true;
    //   } else {
    //     this.router.navigate(['/unauthorized']);
    //     return false;
    //   }
    // } else {
    //   alert("Your are not allowed to accessed  this")
    //   // this.router.navigate(['/loginpage']);
    //   return false;
    // }
  }
  get_role(){
    console.log(this.data_type,"ye hai role ")
    return this.data_type
  }
}
// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { AuthService } from './auth.service';
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   data_type:any;
//   constructor(private authService: AuthService, private router: Router) {}
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     console.log(route.data['allowedRoles'],this.authService.isAuthenticated())
// this.data_type=route.data['allowedRoles']
//     const allowedRoles = route.data['allowedRoles'];
//     const currentRole = this.authService.getCurrentUser()?.role;
//     this.get_role()
//     if (allowedRoles.includes(currentRole)) {
//       return true;
//     } else {
//       alert("You dont have right to this tab")
//       // this.authService.logout();
//       this.router.navigate(['/loginpage']);
//       return true;
//     }
//   }
// }
