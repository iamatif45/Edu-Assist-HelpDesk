import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface to define the Professor model structure (for HOD)
export interface Professor {
  ProfessorId: number;
  FirstName: string;
  LastName: string;
Email: string;
  Contact: string;
  Expertise: string;
}

// Interface to define the Course model structure with nested HOD information
export interface Course {
  CourseId: number;
  CourseName: string;
  Branch: string;
  Hod: number; // This represents the HOD's ID
  Fee: number;
  HodNavigation: Professor; // This represents the detailed information about the HOD
}

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = 'http://localhost:5000/api/Courses'; // Adjust this based on your environment settings

  constructor(private http: HttpClient) {}

  // Private method to get the authentication token from localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Private method to get the Authorization header
  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Get all courses (Admin, Staff roles)
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  // Get course by ID (Admin, Staff, Student roles)
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Add a new course (Admin, Staff roles)
  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course, {
      headers: this.getHeaders(),
    });
  }

  // Update a course (Admin, Staff roles)
  updateCourse(id: number, course: Course): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, course, {
      headers: this.getHeaders(),
    });
  }

  // Delete a course (Admin, Staff roles)
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
