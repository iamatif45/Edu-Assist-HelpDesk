import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TicketDTO {
  TicketId: number;
  StudentId: number;
  DepartmentName: string;  // This is what we'll display when fetching tickets
  Title: string;
  Description: string;
  CurrentStatus: string;
  AssignedToStaffId: number | null;
  ResolvedDate: Date | null;
  Created: Date;
  Updated: Date;
}

export interface Ticket {
  TicketId: number;
  StudentId: number;
  DepartmentId: number;  // Department ID for creation and updates
  Title: string;
  Description: string;
  CurrentStatus: string;
  AssignedToStaffId: number | null;
  ResolvedDate: Date | null;
  Created: Date;
  Updated: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'http://localhost:5000/api/Tickets'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Get all tickets
  getTickets(): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  // Get ticket by ID
  getTicketById(id: number): Observable<TicketDTO> {
    return this.http.get<TicketDTO>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Get tickets by student ID
  getTicketsByStudentId(id: number): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(`${this.apiUrl}/Tickets/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Create a new ticket using the Ticket interface (departmentId instead of departmentName)
  createTicket(ticket: Ticket): Observable<TicketDTO> {
    return this.http.post<TicketDTO>(this.apiUrl, ticket, {
      headers: this.getHeaders(),
    });
  }

  // Update an existing ticket using the Ticket interface (departmentId instead of departmentName)
  updateTicket(id: number, ticket: Ticket): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, ticket, {
      headers: this.getHeaders(),
    });
  }

  // Delete a ticket
  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
