// ticket-log.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
// Import the TicketLog interface

// ticket-log.interface.ts
export interface TicketLog {
  LogId: number;
  TicketId: number;
  UpdatedByStaffId: number | null;
  PreviousStatus: string | null;
  Status: string;
  Comments: string;
  AssignedStaffId: number | null;
  UpdatedDate: string;  // ISO 8601 format date (e.g., "2024-12-08T23:11:36.663")
}


@Injectable({
  providedIn: 'root'
})
export class TicketLogService {

  private apiUrl = 'http://localhost:5000/api/TicketLogs';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Helper method to get headers with Authorization (JWT token)
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Get all ticket logs
  getTicketLogs(): Observable<TicketLog[]> {
    return this.http.get<TicketLog[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  // Get a ticket log by its ID
  getTicketLogById(id: number): Observable<TicketLog> {
    return this.http.get<TicketLog>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Get ticket log by ticket ID
  getTicketLogByTicketId(ticketId: number): Observable<TicketLog[]> {
    return this.http.get<TicketLog[]>(`${this.apiUrl}/Ticketlog/${ticketId}`, {
      headers: this.getHeaders(),
    });
  }

  // Create a new ticket log
  createTicketLog(ticketLog: TicketLog): Observable<TicketLog> {
    return this.http.post<TicketLog>(this.apiUrl, ticketLog, {
      headers: this.getHeaders(),
    });
  }

  // Update a ticket log
  updateTicketLog(id: number, ticketLog: TicketLog): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, ticketLog, {
      headers: this.getHeaders(),
    });
  }

  // Delete a ticket log by ID
  deleteTicketLog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
