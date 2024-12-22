import { Component, OnInit } from '@angular/core';
import { FeedbackService, Feedback } from '../../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedback: Feedback = {
    FeedbackId: 0,
    StudentId: 111, // Example studentId, replace with dynamic value
    FeedbackText: '',
    Rating: 5,
    FeedbackDate: new Date().toISOString(),
    Created: new Date().toISOString()
  };

  feedbacks: Feedback[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = ''; // To hold the success message

  constructor(private feedbackService: FeedbackService) {
    const student = JSON.parse(localStorage.getItem('student') || '{}');

    // Check if studentProfileId exists in the student object
    if (student.StudentProfileId) {
      this.feedback.StudentId = parseInt(student.StudentProfileId, 10);
    } else {
      this.errorMessage = 'Student Profile ID not found in local storage';
    }
  }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  // Load all feedbacks for the student
  loadFeedbacks(): void {
    this.isLoading = true;
    this.feedbackService.getFeedbackByStudentId(this.feedback.StudentId).subscribe(
      (data) => {
        this.feedbacks = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error loading feedbacks. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  // Custom validator to check if feedback has at least 5 words
  hasMinWords(feedbackText: string): boolean {
    const wordCount = feedbackText.trim().split(/\s+/).length;
    return wordCount >= 3; // Check if there are at least 5 words
  }

  // Custom validator to ensure feedback contains valid words (not just numbers or special characters)
  isValidFeedback(feedbackText: string): boolean {
    // Trim the feedback and check for the single letter repetition pattern
    const trimmedFeedback = feedbackText.trim();
    
    // Check if feedback contains at least one alphabetic word
    const validFeedbackRegex = /[a-zA-Z]/;  // Checks for at least one alphabetic character

    // Checks if feedback is just a single letter repeated (with spaces in between)
    const isOnlySingleLetterRepeated = /^([a-zA-Z])(\s+\1)+$/.test(trimmedFeedback);  // Ensures only one repeated letter

    return validFeedbackRegex.test(trimmedFeedback) && !isOnlySingleLetterRepeated;
  }

  // Submit or update feedback
  submitFeedback(): void {
    // Clear any previous success or error messages
    this.successMessage = '';
    this.errorMessage = '';

    // Validate feedback text length
    if (!this.hasMinWords(this.feedback.FeedbackText)) {
      this.errorMessage = 'Feedback must be at least 5 words long and it will not allowed any special chracters like @ # $ % ^ & * ';
      return;
    }

    // Validate if feedback contains only valid words (no just numbers or special characters)
    if (!this.isValidFeedback(this.feedback.FeedbackText)) {
      this.errorMessage = 'Feedback must contain at least one valid word (letters) and cannot consist only of a single letter repeated.';
      return;
    }

    // Check if feedback is new or being updated
    this.isLoading = true;
    if (this.feedback.FeedbackId === 0) {
      // New feedback
      this.feedbackService.addFeedback(this.feedback).subscribe(
        (data) => {
          this.feedbacks.push(data); // Add the new feedback to the list
          this.successMessage = 'Feedback submitted successfully!'; // Set success message
          this.resetForm();
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = 'Error submitting feedback. Please try again later.';
          this.isLoading = false;
        }
      );
    } else {
      // Update existing feedback
      this.feedbackService.updateFeedback(this.feedback.FeedbackId, this.feedback).subscribe(
        () => {
          // Update the feedback in the list
          const index = this.feedbacks.findIndex(f => f.FeedbackId === this.feedback.FeedbackId);
          if (index !== -1) {
            this.feedbacks[index] = this.feedback;
          }
          this.successMessage = 'Feedback updated successfully!'; // Set success message
          this.resetForm();
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = 'Error updating feedback. Please try again later.';
          this.isLoading = false;
        }
      );
    }
  }

  // Reset the form after submission
  resetForm(): void {
    this.feedback = {
      FeedbackId: 0,
      StudentId: 111, // Example studentId
      FeedbackText: '',
      Rating: 5,
      FeedbackDate: new Date().toISOString(),
      Created: new Date().toISOString()
    };
  }

  // Delete feedback by ID
  deleteFeedback(id: number): void {
    this.isLoading = true;
    this.feedbackService.deleteFeedback(id).subscribe(
      () => {
        this.feedbacks = this.feedbacks.filter(feedback => feedback.FeedbackId !== id); // Remove the deleted feedback
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error deleting feedback. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  // Edit feedback
  editFeedback(feedback: Feedback): void {
    this.feedback = { ...feedback }; // Populate the form with the existing feedback data
  }
}
