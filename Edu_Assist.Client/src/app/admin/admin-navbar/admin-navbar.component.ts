import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {

  constructor(private router: Router) { }

  // Logout function that clears the token and redirects to login
  logout() {
    localStorage.removeItem('jwt'); // Remove JWT token from localStorage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
