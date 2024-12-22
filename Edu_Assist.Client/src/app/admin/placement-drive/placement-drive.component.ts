import { Component, OnInit } from '@angular/core';
import { PlacementDriveService, PlacementDrive } from '../../services/placementdrives.service';
import { NgForm } from '@angular/forms';  // Import NgForm for form reference

@Component({
  selector: 'app-placement-drive-create',
  templateUrl: './placement-drive.component.html',
  styleUrls: ['./placement-drive.component.css']
})
export class PlacementDriveCreateComponent implements OnInit {
  // Properly typed placementDrive
  placementDrive: PlacementDrive = {
    DriveId: 0,
    CompanyName: '',
    JobTitle: '',
    EligibilityCriteria: '',
    DriveDate: '',
    StartTime: '',
    EndTime: '',
    Location: '',
    OrganizedBy: '',
    Status: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private placementDriveService: PlacementDriveService) {}

  ngOnInit(): void {}

  // Save placement drive
  savePlacementDrive(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.createPlacementDrive(this.placementDrive, form);
  }

  // Create a new placement drive
  createPlacementDrive(placementDrive: PlacementDrive, form: NgForm): void {
    this.placementDriveService.createPlacementDrive(placementDrive).subscribe(
      (data) => {
        // Show success message
        this.successMessage = 'Placement drive created successfully';

        // Reset the placement drive form
        this.placementDrive = {
          DriveId: 0,
          CompanyName: '',
          JobTitle: '',
          EligibilityCriteria: '',
          DriveDate: '',
          StartTime: '',
          EndTime: '',
          Location: '',
          OrganizedBy: '',
          Status: ''
        };

        // Reset the form fields
        form.resetForm();

        // Hide success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      (error) => {
        // Show error message
        this.errorMessage = 'Error creating placement drive';

        // Hide error message after 3 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }
}
