import { Component ,EventEmitter} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
@Component({
  styles: [`.router-link-active { background-color: red; }`],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  search = new EventEmitter<string>();
  searchText: string | undefined;
  emitSearchText() {
    this.search.emit(this.searchText);
  }
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  showNavbar = false;
  navbarWidth = '900px';
  role: any;
  admin: string = 'https://cdn-icons-png.flaticon.com/512/2345/2345338.png'
  user: string = 'https://cdn-icons-png.flaticon.com/512/9322/9322043.png'
  nouser: string = 'https://img.icons8.com/glyph-neue/512/no-user.png'
  constructor(private router: Router, private authuguard: AuthGuard, private AuthService: AuthService) {  }
  logout() {
    // Remove the isLoggedIn flag from local storage
    localStorage.removeItem('isLoggedIn');
    // Log the user out
    this.AuthService.logout();
    // Navigate to the login page
    this.router.navigate(['/loginpage']);
  }
  ngOnInit() {
    if (window.innerWidth < 1200) {
      this.showNavbar = false;
    } else {
      this.showNavbar = true;
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.role = this.authuguard.get_role();
        console.log(this.role);
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event.url)
        if (event.url === '/home' || event.url === '/loginpage' ||  event.url === '/') {
          this.showNavbar = false;
          console.log("navbar hidden")
        }
        else{
          this.showNavbar = true;
        }
       
      }
    });
    const button = document.getElementById('scroll-to-top') as HTMLButtonElement;
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        button.style.display = 'block';
      } else {
        button.style.display = 'block';
      }
    });
    
  }
  ngOnchange() {
  }

}
