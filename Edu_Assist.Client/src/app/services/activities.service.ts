import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface for Activity
export interface Activity {
  ActivityId: number;
  ActivityType: string;
  Title: string;
  Description: string;
  Organizer: string;
  ActivityDate: string; // You may want to use Date instead of string if you're handling date objects
  StartTime: string;
  EndTime: string;
  Location: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private apiUrl = 'http://localhost:5000/api/Activities';  // API base URL

  constructor(private http: HttpClient) { }

  // Get JWT token from localStorage (assumes token is stored there)
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');  // Assuming the token is stored under this key
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  // Get all activities (Accessible by Admin, Staff, and Student)
  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Get activity by ID (Admin and Staff only)
  getActivityById(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Create a new activity (Admin and Staff only)
  createActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.apiUrl, activity, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Update an existing activity (Admin and Staff only)
  updateActivity(id: number, activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(`${this.apiUrl}/${id}`, activity, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Delete an activity (Admin and Staff only)
  deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
