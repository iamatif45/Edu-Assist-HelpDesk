import { Component, OnInit } from '@angular/core';
import { TicketService, TicketDTO } from '../../services/ticket.service';
import { TicketLogService, TicketLog } from '../../services/ticket-log.service';

@Component({
  selector: 'app-ticket-log',
  templateUrl: './ticket-ticketlog.component.html',
  styleUrls: ['./ticket-ticketlog.component.css']
})
export class TicketLogComponent implements OnInit {
  tickets: TicketDTO[] = [];
  filteredTickets: TicketDTO[] = [];
  selectedTicketId: number | null = null;
  ticketLogs: TicketLog[] = [];
  newLog: TicketLog = {
    LogId: 0,
    TicketId: 0,
    UpdatedByStaffId: null,
    PreviousStatus: null,
    Status: '',
    Comments: '',
    AssignedStaffId: null,
    UpdatedDate: ''
  };

  searchQuery: string = '';  // For search input
  searchErrorMessage: string = ''; // For handling search errors
  commentErrorMessage: string = ''; // For comment validation error

  constructor(
    private ticketService: TicketService,
    private ticketLogService: TicketLogService
  ) {}

  ngOnInit(): void {
    // Get all tickets on component initialization
    this.loadTickets();
  }

  // Load all tickets
  loadTickets(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.filteredTickets = data; // Initially, show all tickets
      },
      (error) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }

  // Select a ticket and load its logs
  selectTicket(ticketId: number): void {
    this.selectedTicketId = ticketId;
    this.loadTicketLogs(ticketId);
  }

  // Load logs for the selected ticket
  loadTicketLogs(ticketId: number): void {
    this.ticketLogService.getTicketLogByTicketId(ticketId).subscribe(
      (data) => {
        this.ticketLogs = data;
      },
      (error) => {
        console.error('Error fetching ticket logs:', error);
      }
    );
  }

  // Handle the submission of the new log form
  createNewLog(): void {
    if (this.selectedTicketId !== null) {
      // Validate comment
      if (this.isValidComment(this.newLog.Comments)) {
        this.commentErrorMessage = ''; // Reset the error message

        // Proceed with creating the new log
        this.newLog.TicketId = this.selectedTicketId;
        this.newLog.UpdatedDate = new Date().toISOString();

        this.ticketLogService.createTicketLog(this.newLog).subscribe(
          (data) => {
            this.ticketLogs.push(data); // Add the new log to the list
            this.resetNewLogForm(); // Reset the form
          },
          (error) => {
            console.error('Error creating ticket log:', error);
          }
        );
      } else {
        this.commentErrorMessage = 'The comment must start with at least two words containing only alphabetical characters and can contain any characters afterward.';
      }
    }
  }

  // Reset the form for creating a new log
  resetNewLogForm(): void {
    this.newLog = {
      LogId: 0,
      TicketId: 0,
      UpdatedByStaffId: null,
      PreviousStatus: null,
      Status: '',
      Comments: '',
      AssignedStaffId: null,
      UpdatedDate: ''
    };
  }

  // Filter tickets based on search query (Ticket ID or Student ID)
  filterTickets(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredTickets = this.tickets.filter(ticket => 
      ticket.TicketId.toString().includes(query) || 
      ticket.StudentId.toString().includes(query)
    );

    // Show error message if no tickets are found
    if (this.filteredTickets.length === 0) {
      this.searchErrorMessage = 'No tickets found for the given search query.';
    } else {
      this.searchErrorMessage = '';
    }
  }

  // Validate the comment field (first two words must contain only alphabetic characters)
  isValidComment(comment: string): boolean {
    const words = comment.trim().split(/\s+/); // Split by spaces
    const minWords = 2; // At least 2 words at the start

    // Check if the comment has at least two words
    if (words.length < minWords) {
      return false;
    }

    // Validate that the first two words contain only alphabetical characters
    const firstTwoWords = words.slice(0, 2);
    const alphabeticPattern = /^[a-zA-Z]+$/; // Only alphabetic characters allowed

    if (!firstTwoWords.every(word => alphabeticPattern.test(word))) {
      return false;
    }

    // After the first two words, any character is allowed
    const allowedCharsPattern = /^[a-zA-Z0-9\s#$%&^@]*$/;

    // The comment must match the allowed characters pattern after the first two words
    return allowedCharsPattern.test(comment);
  }

  // Determine the badge color based on the ticket status
  getStatusBadgeColor(status: string): string {
    switch (status) {
        case 'Open': return 'bg-danger';  // Red
        case 'In-progress': return 'bg-warning';  // Yellow
        case 'Resolved': return 'bg-success';  // Green
        case 'Closed': return 'bg-primary';  // Blue
        default: return '';
    }
  }
}
