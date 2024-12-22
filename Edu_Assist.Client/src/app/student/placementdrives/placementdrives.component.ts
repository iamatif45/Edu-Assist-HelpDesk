// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-placementdrives',
//   templateUrl: './placementdrives.component.html',
//   styleUrl: './placementdrives.component.css'
// })
// export class PlacementdrivesComponent {

// }

import { Component, OnInit } from '@angular/core';
// import { PlacementDriveService, PlacementDrive } from '../../services/placementdrive.service';
import { PlacementDriveService } from '../../services/placementdrives.service';
import { PlacementDrive } from '../../services/placementdrives.service';
@Component({
  selector: 'app-placement-drives',
  templateUrl: './placementdrives.component.html',
  styleUrls: ['./placementdrives.component.css']
})
export class PlacementDrivesComponent implements OnInit {
  placementDrives: PlacementDrive[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private placementDriveService: PlacementDriveService) {}

  ngOnInit(): void {
    this.loadPlacementDrives();
  }

  loadPlacementDrives(): void {
    this.isLoading = true;
    this.placementDriveService.getAllPlacementDrives().subscribe(
      (data) => {
        this.placementDrives = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error loading placement drives. Please try again later.';
        this.isLoading = false;
      }
    );
  }
}
