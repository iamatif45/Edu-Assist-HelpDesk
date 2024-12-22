import { Component, OnInit } from '@angular/core';
import { TicketService, TicketDTO } from '../../services/ticket.service';
import { TicketLogService, TicketLog } from '../../services/ticket-log.service';

@Component({
  selector: 'app-ticket-ticketlog',
  templateUrl: './ticket-ticketlog.component.html',
  styleUrls: ['./ticket-ticketlog.component.css']
})
export class TicketTicketLogComponent implements OnInit {
  tickets: TicketDTO[] = [];
  selectedTicketId: number | null = null;
  ticketLogs: TicketLog[] = [];
  errorMessage: string = '';
  ticketIdSearch: number | null = null;

  // Define studentProfileId to fetch tickets for the student
  studentProfileId: number | null = null;

  constructor(
    private ticketService: TicketService,
    private ticketLogService: TicketLogService
  ) {}

  ngOnInit(): void {
    // Get the studentProfileId from localStorage or another service
    const student = JSON.parse(localStorage.getItem('student') || '{}');
    if (student && student.StudentProfileId) {
      this.studentProfileId = parseInt(student.StudentProfileId, 10);
      this.fetchTickets(); // Fetch tickets for the student
    } else {
      this.errorMessage = 'Student Profile ID not found in local storage';
    }
  }

  // Fetch tickets based on studentProfileId
  fetchTickets(): void {
    if (this.studentProfileId !== null) {
      this.ticketService.getTicketsByStudentId(this.studentProfileId).subscribe({
        next: (response) => {
          this.tickets = response;
        },
        error: (error) => {
          this.errorMessage = 'Error fetching tickets. Please try again later.';
          console.error('Error fetching tickets:', error);
        }
      });
    }
  }

  // Fetch ticket logs when a ticket is selected
  fetchTicketLogs(ticketId: number): void {
    this.ticketLogService.getTicketLogByTicketId(ticketId).subscribe({
      next: (response) => {
        this.ticketLogs = response;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching ticket logs. Please try again later.';
        console.error('Error fetching ticket logs:', error);
      }
    });
  }

  // Select a ticket from the left panel and fetch logs
  onSelectTicket(ticketId: number): void {
    this.selectedTicketId = ticketId;
    this.fetchTicketLogs(ticketId);
  }

  // Search tickets by ticket ID
  onSearchTicket(): void {
    if (this.ticketIdSearch != null) {
      this.ticketService.getTicketById(this.ticketIdSearch).subscribe({
        next: (response) => {
          this.tickets = [response]; // Show only the searched ticket
          this.errorMessage='';
        },
        error: (error) => {
          this.errorMessage = 'Ticket not found.';
          console.error('Error searching ticket:', error);
        }
      });
    } else {
      this.fetchTickets(); // Show all tickets if no search ID is provided
    }
    
  }
  clearError() {
    this.errorMessage = null; // Clear the error message immediately
  }
}
