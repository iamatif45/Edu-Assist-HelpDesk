import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from '../_interface/authenticated-response';
import { Login } from '../_interface/login';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean | undefined;
  credentials: Login = { Username: '', Password: '', Role: '' };

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  login = (form: NgForm) => {
    if (form.valid) {
      this.http.post<AuthenticatedResponse>("http://localhost:5000/api/Authentication", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.Token;

          if (response.IsActive) {
            const user = {
              username: response.Username,
              userId: response.UserId,
              email: response.Email,
              roleId: response.RoleId,
              roleName: response.RoleName
            };

            // Store token and user in localStorage (user object is stringified)
            localStorage.setItem("jwt", token); 
            localStorage.setItem("user", JSON.stringify(user));  // Store user object as JSON string

            this.invalidLogin = false;

            // Redirect to the appropriate page based on the role
            if (response.RoleName === 'Student') {
              this.router.navigate(['/student']);
            } else if (response.RoleName === 'Admin') {
              this.router.navigate(['/admin']);
            } else if (response.RoleName === 'Staff') {
              this.router.navigate(['/staff']);
            } else {
              this.router.navigate(['/']);  // Default route if no matching role
            }
          } else {
            // If the user is not active, redirect to the login page
            this.invalidLogin = true;
            alert("Your account is not active. Please contact support.");
            this.router.navigate(["/login"]);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.invalidLogin = true;
        }
      });
    }
  }
}
