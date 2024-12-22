import { Component, OnInit } from '@angular/core';
import { TicketService, Ticket } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
  departments = [
    { id: 101, name: 'Academics' },
    { id: 102, name: 'Finance' },
    { id: 103, name: 'Training & Placement' },
    { id: 104, name: 'Logistics' },
    { id: 105, name: 'Other' },
  ];

  studentProfileId: number;
  errorMessage: string = ''; // Initialize error message property
  successMessage: string = ''; // Initialize success message property

  // Define the 'ticket' object to bind to form fields
  ticket: Ticket = {
    TicketId: 0,
    StudentId: 0,
    DepartmentId: 0,
    Title: '',
    Description: '',
    CurrentStatus: 'Open', // Default to 'Open'
    AssignedToStaffId: null,
    ResolvedDate: null,
    Created: new Date(),
    Updated: new Date(),
  };

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) {
    const student = JSON.parse(localStorage.getItem('student') || '{}');

    // Check if studentProfileId exists in the student object
    if (student && student.StudentProfileId) {
      this.studentProfileId = parseInt(student.StudentProfileId, 10);
      this.ticket.StudentId = this.studentProfileId; // Set the studentProfileId in the ticket object
    } else {
      this.errorMessage = 'Student Profile ID not found in local storage';
    }
  }

  ngOnInit(): void {}

  // Custom validator for checking at least 5 words in description
  minWordsValidator(description: string): boolean {
    const wordCount = description ? description.split(/\s+/).filter(Boolean).length : 0;
    return wordCount >= 5;
  }

  // Function to validate if a string contains only valid characters (letters, numbers, spaces)
  validateTitle(title: string): boolean {
    const regex = /^[A-Za-z0-9\s]+$/;
    const isValid = regex.test(title);

    if (!isValid || /\d{2,}/.test(title)) {
      this.errorMessage = 'Title must only contain valid words and cannot contain sequences of numbers or special characters.';
      return false;
    }
    return true;
  }

  // Function to validate if description contains at least 10 words and valid characters
  validateDescription(description: string): boolean {
    const regex = /^[A-Za-z0-9\s,.-]+$/;
    const wordCount = description ? description.split(/\s+/).filter(Boolean).length : 0;

    if (wordCount < 5 || !regex.test(description) || /\d{2,}/.test(description)) {
      this.errorMessage = 'Description must contain at least 5 words and can only include valid characters.';
      return false;
    }
    return true;
  }

  // Submit form to create a ticket
  onSubmit(form: NgForm): void {
    // Check if form is valid
    if (form.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.successMessage = ''; // Clear any success message
      return;
    }

    // Validate title and description
    if (!this.validateTitle(this.ticket.Title) || !this.validateDescription(this.ticket.Description)) {
      return; // If title or description is invalid, return and do not submit
    }

    // Prepare the ticket object to send to the service
    const newTicket: Ticket = {
      ...this.ticket,
      DepartmentId: form.value.departmentId,
      CurrentStatus: form.value.currentStatus || 'Open',
    };

    // Call the ticketService to create the new ticket
    this.ticketService.createTicket(newTicket).subscribe({
      next: (response) => {
        // On success, set the success message and clear the error message
        this.successMessage = 'Ticket created successfully!';
        this.errorMessage = ''; // Clear any previous error message
        this.resetForm(form); // Reset the form after successful submission
        this.router.navigate(['/student/tickets']); // Navigate to another route (for example, the list of tickets)
      },
      error: (error) => {
        // On failure, set the error message and clear the success message
        this.errorMessage = 'There was an error creating the ticket. Please try again later.';
        this.successMessage = ''; // Clear any previous success message
      }
    });
  }

  // Method to reset the form and ticket object
  resetForm(form: NgForm): void {
    form.resetForm(); // Reset form fields
    this.ticket = {
      TicketId: 0,
      StudentId: this.studentProfileId,
      DepartmentId: 0,
      Title: '',
      Description: '',
      CurrentStatus: 'Open',
      AssignedToStaffId: null,
      ResolvedDate: null,
      Created: new Date(),
      Updated: new Date(),
    }; // Reset the ticket object to initial state
  }
}
