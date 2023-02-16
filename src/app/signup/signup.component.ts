import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  submitSignupForm(username: string, password: string, role: string) {
    // Validate the input here
  
    // Push the new user to the users array
    this.authService.addUser(username, password, role);
    this.router.navigate(['/loginpage']);
  }
  
}
