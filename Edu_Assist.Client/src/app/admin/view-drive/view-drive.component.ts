import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlacementDriveService, PlacementDrive } from '../../services/placementdrives.service';
import { NgForm } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-placement-drive',
  templateUrl: './view-drive.component.html',
  styleUrls: ['./view-drive.component.css']
})
export class AdminViewDriveComponent implements OnInit {
  placementDrives: PlacementDrive[] = [];
  selectedDrive: PlacementDrive | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  hideMessages: boolean = false;

  constructor(private placementDriveService: PlacementDriveService, private router: Router) {}

  ngOnInit(): void {
    this.getPlacementDrives();
  }

  // Fetch all placement drives from the service
  getPlacementDrives(): void {
    this.placementDriveService.getAllPlacementDrives().subscribe(
      (data) => {
        this.placementDrives = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching placement drives';
        this.showMessage();
      }
    );
  }

  // Fetch specific placement drive details for editing
  onEdit(driveId: number): void {
    this.placementDriveService.getPlacementDriveById(driveId).subscribe(
      (data) => {
        this.selectedDrive = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching placement drive for editing';
        this.showMessage();
      }
    );
  }

  // Update the selected placement drive
  updateDrive(): void {
    if (this.selectedDrive) {
      this.placementDriveService.updatePlacementDrive(this.selectedDrive.DriveId, this.selectedDrive).subscribe(
        (data) => {
          this.successMessage = 'Drive updated successfully!';
          this.showMessage();
          this.getPlacementDrives(); // Refresh the list
          this.selectedDrive = null; // Close the modal
        },
        (error) => {
          this.errorMessage = 'Error updating placement drive';
          this.showMessage();
        }
      );
    }
  }

  // Delete a placement drive
  deleteDrive(driveId: number): void {
    this.placementDriveService.deletePlacementDrive(driveId).subscribe(
      () => {
        this.successMessage = 'Placement Drive deleted successfully';
        this.getPlacementDrives();  // Refresh the list after deletion
        this.showMessage();
      },
      (error) => {
        this.errorMessage = 'Error deleting placement drive';
        this.showMessage();
      }
    );
  }

  // Cancel the editing mode
  cancelEdit(): void {
    this.selectedDrive = null;
  }

  // Show success or error message for a few seconds
  private showMessage(): void {
    this.hideMessages = false;
    setTimeout(() => {
      this.hideMessages = true;
    }, 3000);  // Hide the message after 3 seconds
  }

  // Custom validator for company name, job title, and location
  noRepeatedSpecialCharsOrNumbers(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex = /([!@#$%^&*()_+=\-;':",<>\.?\/\\[\]{}|`~])\1+/g;
    if (regex.test(value) || !/[a-zA-Z]{4,}/.test(value)) {
      return { invalidInput: 'Should not contain repeated special characters or numbers. Must contain at least one word of alphabets of minimum 4 characters.' };
    }
    return null;
  }

  // Custom validator for eligibility criteria
  eligibilityValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex = /([!@#$%^&*()_+=\-;':",<>\.?\/\\[\]{}|`~])\1+/g;
    if (regex.test(value) || !/[a-zA-Z]{4,}/.test(value)) {
      return { invalidEligibility: 'Eligibility criteria should not contain repeated special characters or numbers. Must contain at least one word of alphabets of minimum 4 characters.' };
    }
    return null;
  }
  validateInput(control: any): void {
    if (control.errors && control.errors['pattern']) {
      control.setErrors({'pattern': true});
    }
  }
}
