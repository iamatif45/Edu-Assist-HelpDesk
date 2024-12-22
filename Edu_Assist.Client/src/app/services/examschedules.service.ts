import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExamScheduleDisplay {
  ExamId: number;
  CourseId: number;
  SubjectId:number
  SubjectName: string;
  ExamDate: string;  // Use ISO date format
  StartTime: string; // Use ISO time format
  EndTime: string;   // Use ISO time format
  Room: string;
}

export interface ExamSchedule {
  ExamId: number;
  CourseId: number;
  SubjectId: number;
  SubjectName:string;
  ExamDate: string;  // Use ISO date format
  StartTime: string; // Use ISO time format
  EndTime: string;   // Use ISO time format
  Room: string;
}


@Injectable({
  providedIn: 'root',
})
export class ExamScheduleService {
  private apiUrl = "http://localhost:5000/api/ExamSchedules"; // Base API URL for exam schedule API

  constructor(private http: HttpClient) {}

  // Get all exam schedules
  getExamSchedules(): Observable<ExamScheduleDisplay[]> {
    return this.http.get<ExamScheduleDisplay[]>(this.apiUrl, { headers: this.createHeaders() });
  }

  // Get exam schedule by ID
  getExamScheduleById(id: number): Observable<ExamScheduleDisplay> {
    return this.http.get<ExamScheduleDisplay>(`${this.apiUrl}/${id}`, { headers: this.createHeaders() });
  }

  // Get exam schedules by Course ID
  getExamSchedulesByCourseId(courseId: number): Observable<ExamScheduleDisplay[]> {
    return this.http.get<ExamScheduleDisplay[]>(`${this.apiUrl}/exam/${courseId}`, { headers: this.createHeaders() });
  }

  // Add new exam schedule
  addExamSchedule(examSchedule: ExamSchedule): Observable<ExamSchedule> {
    return this.http.post<ExamSchedule>(this.apiUrl, examSchedule, { headers: this.createHeaders() });
  }

  // Update an existing exam schedule
  updateExamSchedule(ExamId: number, examSchedule: ExamSchedule): Observable<ExamSchedule> {
    return this.http.put<ExamSchedule>(`${this.apiUrl}/${ExamId}`, examSchedule, { headers: this.createHeaders() });
  }

  // Delete an exam schedule
  deleteExamSchedule(ExamId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ExamId}`, { headers: this.createHeaders() });
  }

  // Helper function to create headers with authorization
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt'); // Retrieve token from local storage or any auth service
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
