import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showNavbar = false;

  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }
  constructor( private route: ActivatedRoute,private router: Router, private authuguard: AuthGuard,private AuthService: AuthService) { }

  ngOnInit(): void {
    const currentRoute = this.router.url;
    if (currentRoute === '/dashboard') {
      document.body.classList.remove('no-navbar');
    } else {
      document.body.classList.add('no-navbar');
    }
  
  }
  logout(){
    // Remove the isLoggedIn flag from local storage
    localStorage.removeItem('isLoggedIn');
    // Log the user out
    this.AuthService.logout();
    // Navigate to the login page
    this.router.navigate(['/loginpage']);
     }
}
