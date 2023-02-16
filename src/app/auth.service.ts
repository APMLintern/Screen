// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roles: string[] = ['admin', 'user', 'guest'];
  private users = [
    {username: 'admin', password: 'admin', role: 'admin'},
    {username: 'user', password: 'user', role: 'user'},
    {username: 'guest', password: 'guest', role: 'guest'},
    {username: 'admin@123', password: 'admin@123', role: 'admin'}
  ];

  private currentUser!: null | { username: string; password: string; role: string; };

  login(username: string, password: string): boolean {
    let isAuthenticated = false;
    for (const user of this.users) {
      if (user.username === username && user.password === password) {
        this.currentUser = user;
        isAuthenticated = true;
   
        break;
      }
    }
    return isAuthenticated;
  }
  addUser(username: string, password: string, role: string) {
    this.users.push({username, password, role});
  }
  logout() {
    // Perform the logout operation (e.g. clear local storage, make an API call, etc.)
 

  // Clear the user information
  this.currentUser=null;


}


  isAuthenticated(): boolean {
    if (this.currentUser && this.currentUser.role === 'admin' ) {
        return true;
    }
    else if (this.currentUser && this.currentUser.role === 'user' ) {
        return true;
    }
    else if (this.currentUser && this.currentUser.role === 'guest' ) {
        return true;
    }
    else{
      return false;
    }
}



  getCurrentUser() {
    return this.currentUser;
  }

  getRoles() {
    console.log(this.roles)
    return this.roles;
  }

  isAuthorized(allowedRoles: string[]): boolean {
    if (!this.isAuthenticated() && !this.currentUser) {
      return false;
    }
    for (const role of allowedRoles) {
      if (this.currentUser?.role === role) {
        return true;
      }
    }
    return false;
  }
}
