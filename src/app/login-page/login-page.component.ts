// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      console.log('Login successful!',this.authService);
      if (this.authService.isAuthorized(['admin'])) {
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/dashboard']);
      } else if (this.authService.isAuthorized(['user'])) {
        localStorage.setItem('isLoggedIn', 'false1');
        this.router.navigate(['/home']);
      }else if (this.authService.isAuthorized(['guest'])) {
        localStorage.setItem('isLoggedIn', 'false1');
        this.router.navigate(['/guest']);
      }  else {
        alert('Unauthorized access!');
      }
    } else {
      alert('Invalid credentials!');
    }
  }

  signup(){
    this.router.navigate(['/signup']);
  }

}
