import { Component, OnInit } from '@angular/core';
import { ActivitiesService, Activity } from '../../services/activities.service';
import { sampleTime, timeout, timestamp } from 'rxjs';

@Component({
  selector: 'app-admin-activity-list',
  templateUrl: './admin-activities.component.html',
  styleUrls: ['./admin-activities.component.css']
})
export class AdminActivityListComponent implements OnInit {
  activities: Activity[] = [];
  selectedActivity: Activity | null = null; // To hold the selected activity for editing
  searchQuery: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  activity: Activity = {
    ActivityId: 0,
    ActivityType: '',
    Title: '',
    Description: '',
    Organizer: '',
    ActivityDate: new Date().toISOString(),
    StartTime: '',
    EndTime: '',
    Location: ''
  };

  modalOpen = false;  // Flag to control the modal visibility
hoveredCardId: any;

  constructor(private activitiesService: ActivitiesService) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.activitiesService.getAllActivities().subscribe(
      (data) => {
        this.activities = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load activities.';
      }
    );
  }

  // Validation Methods (No changes to the validation logic as per your requirement)
  isValidTitle(title: string): boolean {
    const regex = /^[A-Za-z,. -:\s]+$/;  // Only alphabetic characters and spaces
    return regex.test(title);
  }

  isValidDescription(description: string): boolean {
    const regex = /^[A-Za-z -:;.\s]+$/;  // Only alphabetic characters and spaces
    const words = description.trim().split(/\s+/);
    return words.length >= 3 && words.every(word => regex.test(word));
  }

  isValidActivityType(activityType: string): boolean {
    const regex = /^[A-Za-z -:;.\s]+$/;  // Only alphabetic characters and spaces
    const words = activityType.trim().split(/\s+/);
    return words.length >= 2 && words.every(word => regex.test(word));
  }

  isValidOrganizer(organizer: string): boolean {
    const regex = /^[A-Za-z -:;.\s]+$/;  // Only alphabetic characters and spaces
    const words = organizer.trim().split(/\s+/);
    return words.length >= 2 && words.every(word => regex.test(word));
  }

  // Validate all fields before submit
  validateActivity(): boolean {
    if (!this.isValidTitle(this.activity.Title)) {
      this.errorMessage = 'Title must contain only alphabetic characters.';
      return false;
    }
    if (!this.isValidDescription(this.activity.Description)) {
      this.errorMessage = 'Description must contain at least 3 words with alphabetic characters only.';
      return false;
    }
    if (!this.isValidActivityType(this.activity.ActivityType)) {
      this.errorMessage = 'Activity Type must contain at least 2 words with alphabetic characters only.';
      return false;
    }
    if (!this.isValidOrganizer(this.activity.Organizer)) {
      this.errorMessage = 'Organizer must contain at least 2 words with alphabetic characters only.';
      return false;
    }
    this.errorMessage = ''; // Clear error message if all validations pass
    return true;
  }

  openModal(): void {
    this.modalOpen = true;  // Open the modal
  }

  closeModal(): void {
    this.modalOpen = false;  // Close the modal
    this.selectedActivity = null;  // Clear selected activity
    this.activity = {
      ActivityId: 0,
      ActivityType: '',
      Title: '',
      Description: '',
      Organizer: '',
      ActivityDate: '',
      StartTime: '',
      EndTime: '',
      Location: ''
    };  // Reset form
  }

  createActivity(): void {
    if (!this.validateActivity()) {
      return;  // Stop further action if validation fails
    }
  
    this.activitiesService.createActivity(this.activity).subscribe(
      (data) => {
        this.activities.push(data);
        this.successMessage = 'Activity created successfully!';
        this.closeModal();  // Close the modal after creation
      },
      (error) => {
        if (error.status === 400) {
          this.errorMessage = 'Bad request - Invalid data';
        } else {
          this.errorMessage = 'Error creating activity';
        }
      }
    );
  }

  updateActivity(): void {
    if (!this.validateActivity()) {
      return;  // Stop further action if validation fails
    }

    this.activitiesService.updateActivity(this.activity.ActivityId, this.activity).subscribe(
      () => {
        const index = this.activities.findIndex(a => a.ActivityId === this.activity.ActivityId);
        if (index > -1) {
          this.activities[index] = this.activity;  // Update the activity in the list
        }
        this.successMessage = 'Activity updated successfully!';
        this.closeModal();  // Close the modal after update
      },
      (error) => {
        this.errorMessage = 'Error updating activity';
      }
    );
  }

  deleteActivity(id: number): void {
    this.activitiesService.deleteActivity(id).subscribe(
      () => {
        this.activities = this.activities.filter(a => a.ActivityId !== id);
        this.successMessage = 'Activity deleted successfully!';
      },
      (error) => {
        this.errorMessage = 'Error deleting activity';
      }
    );
  }

  filterActivities(): void {
    if (this.searchQuery) {
      this.activities = this.activities.filter(activity =>
        activity.Title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        activity.ActivityDate.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        activity.Organizer.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadActivities(); // Reload all activities if no search query
    }
  }

  editActivity(id: number): void {
    this.activitiesService.getActivityById(id).subscribe(
      (data) => {
        this.selectedActivity = data;
        this.activity = { ...data };  // Populate the form with selected activity details
        this.modalOpen = true;  // Open the modal
      },
      (error) => {
        this.errorMessage = 'Error fetching activity for editing.';
      }
    );
  }
  onCardHover(ActivityId: number): void {
    this.hoveredCardId = ActivityId;
  }

  onCardLeave(ActivityId: number): void {
    if (this.hoveredCardId === ActivityId) {
      this.hoveredCardId = null;
    }
  }

}
