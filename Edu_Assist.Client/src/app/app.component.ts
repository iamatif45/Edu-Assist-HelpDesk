


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem("jwt");

    if (token) {
      const user = JSON.parse(localStorage.getItem("user") || '{}');
      const roleName = user?.roleName;

      // Redirect user to their respective page based on their role
      if (roleName === 'Student') {
        this.router.navigate(['/student']);
      }else if (roleName === 'Admin') {
        this.router.navigate(['/admin']);
      }
    }
  }
}
