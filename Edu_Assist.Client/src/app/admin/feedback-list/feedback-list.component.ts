import { Component, OnInit } from '@angular/core';
import { FeedbackService, Feedback } from '../../services/feedback.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = [];
  searchQuery: string = '';  // For search input
  searchErrorMessage: string = ''; // To display error message

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    // Get all feedbacks when the component initializes
    this.loadFeedbacks();
  }

  // Load all feedbacks
  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe(
      (data) => {
        this.feedbacks = data;
        this.filteredFeedbacks = data;  // Initially, show all feedbacks
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
      }
    );
  }

  // Filter feedbacks based on search query (studentId or rating)
  filterFeedbacks(): void {
    const query = this.searchQuery.trim();

    // If the search query is empty, show all feedbacks
    if (query === '') {
      this.filteredFeedbacks = this.feedbacks;
      this.searchErrorMessage = ''; // Clear any previous error messages
      return;
    }

    // Validate that the search input is a number
    if (!this.isNumeric(query)) {
      this.searchErrorMessage = 'Please enter a valid number for Student ID or Rating.';
      this.filteredFeedbacks = []; // Clear the list if invalid input
      return;
    }

    this.searchErrorMessage = ''; // Clear error message if input is valid

    // Filter based on Student Id or Rating
    this.filteredFeedbacks = this.feedbacks.filter(feedback =>
      feedback.StudentId.toString().includes(query) ||
      feedback.Rating.toString().includes(query)
    );

    // If no feedbacks match the search query, show an error message
    if (this.filteredFeedbacks.length === 0) {
      this.searchErrorMessage = 'No feedbacks found matching your search query.';
    }
  }

  // Helper method to check if a string is a valid number
  isNumeric(value: string): boolean {
    return !isNaN(Number(value)) && !isNaN(parseFloat(value));
  }
}
