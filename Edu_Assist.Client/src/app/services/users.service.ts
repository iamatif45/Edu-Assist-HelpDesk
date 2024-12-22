import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define User and Login models
export interface User {
  UserId: Number;
  Username: string;
  PasswordHash?: string;
  Email?: string;
  RoleId?: number;
  IsActive?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users'; // Adjust with your actual API URL

  constructor(private http: HttpClient) {}

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-username/${username}`);
  }

  // Get all users

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Get a user by username
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${username}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Update user information
  updateUser(username: string, user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${username}`, user, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Update user password
  updatePassword(username: string, oldPassword: string, user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/password/${username}/${oldPassword}`, user, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete user by username
  deleteUser(username: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${username}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Helper method to set authorization headers (for authenticated requests)
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt'); // Retrieve JWT token from local storage
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Error handling method
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error: ${error.status} - ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
