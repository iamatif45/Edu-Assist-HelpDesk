// src/app/services/feedback.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Feedback {
  FeedbackId: number;
  StudentId: number;
  FeedbackText: string;
  Rating: number;
  FeedbackDate: string;
  Created: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:5000/api/Feedbacks'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Get all feedbacks for an admin (if needed)
  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}`, this.getAuthHeaders());
  }

  // Get feedback by feedback ID
  getFeedbackById(feedbackId: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}/${feedbackId}`, this.getAuthHeaders());
  }

  // Get feedback by student ID
  getFeedbackByStudentId(studentId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/Student/${studentId}`, this.getAuthHeaders());
  }

  // Add new feedback (only accessible to students)
  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback, this.getAuthHeaders());
  }

  // Update feedback (only accessible to the student who created it)
  updateFeedback(feedbackId: number, feedback: Feedback): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${feedbackId}`, feedback, this.getAuthHeaders());
  }

  // Delete feedback (only accessible to the student who created it)
  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${feedbackId}`, this.getAuthHeaders());
  }

  // Helper method to get authorization headers (assuming JWT tokens)
  private getAuthHeaders() {
    const token = localStorage.getItem('jwt'); // Replace with how you store the token
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }
}
