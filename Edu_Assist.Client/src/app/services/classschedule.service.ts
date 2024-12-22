import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define ClassSchedule interface according to the model
export interface ClassSchedule {
  ScheduleId: number;
  SubjectId: number;
  CourseId: number;
  StartTime: string; // You can adjust types as per your API's response
  EndTime: string;
  DayOfWeek: string;
}

@Injectable({
  providedIn: 'root',
})



export class ClassSchedulesService {
  private apiUrl = 'http://localhost:5000/api/ClassSchedules'; // Adjust the URL

  constructor(private http: HttpClient) {}
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
  // Get all class schedules
  getAllClassSchedules(): Observable<ClassSchedule[]> {
    return this.http.get<ClassSchedule[]>(this.apiUrl, {
      headers: this.getHeaders()  // Add JWT token in the request headers
    });
  }

  // Get class schedule by ID
  getClassScheduleById(id: number): Observable<ClassSchedule> {
    return this.http.get<ClassSchedule>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()  // Add JWT token in the request headers
    });
  }

  // Get class schedules by course ID
  getClassScheduleByCourseId(courseId: number): Observable<ClassSchedule[]> {
    return this.http.get<ClassSchedule[]>(`${this.apiUrl}/course/${courseId}`, {
      headers: this.getHeaders()  // Add JWT token in the request headers
    });
  }

  // Add a new class schedule
  addClassSchedule(classSchedule: ClassSchedule): Observable<ClassSchedule> {
    return this.http.post<ClassSchedule>(this.apiUrl, classSchedule, {
      headers: this.getHeaders()  // Add JWT token in the request headers
    });
  }

  // Update an existing class schedule
  updateClassSchedule(id: number, classSchedule: ClassSchedule): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, classSchedule, {
      headers: this.getHeaders()  // Add JWT token in the request headers
    });
  }

  // Delete a class schedule by ID
  deleteClassSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()  // Add JWT token in the request headers
    });
  }
  
}
