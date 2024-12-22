import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-navbar',
  templateUrl: './student-nav.component.html',
  styleUrls: ['./student-nav.component.css']
})
export class StudentNavbarComponent {

  constructor(private router: Router) { }

  // Logout function that clears the token and redirects to login
  logout() {
    localStorage.removeItem('jwt'); // Remove JWT token from localStorage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
