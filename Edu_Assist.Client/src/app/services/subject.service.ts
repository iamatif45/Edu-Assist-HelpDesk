import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Subject interface
export interface Subject {
  SubjectId: number;
  SubjectName: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:5000/api/Subjects'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Method to get Authorization headers
  private getAuthHeaders() {
    const token = localStorage.getItem('jwt'); // Replace with how you store the token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Get all subjects with Authorization headers
  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // Get a subject by ID with Authorization headers
  getSubjectById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Create a new subject with Authorization headers
  createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.apiUrl, subject, {
      headers: this.getAuthHeaders()
    });
  }

  // Update an existing subject with Authorization headers
  updateSubject(id: number, subject: Subject): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, subject, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete a subject with Authorization headers
  deleteSubject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
