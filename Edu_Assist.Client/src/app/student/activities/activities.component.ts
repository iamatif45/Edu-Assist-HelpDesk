// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-activities',
//   templateUrl: './activities.component.html',
//   styleUrl: './activities.component.css'
// })
// export class ActivitiesComponent {

// }
import { Component, OnInit } from '@angular/core';
import { ActivitiesService, Activity } from '../../services/activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private activitiesService: ActivitiesService) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.isLoading = true;
    this.activitiesService.getAllActivities().subscribe(
      (data) => {
        this.activities = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error loading activities. Please try again later.';
        this.isLoading = false;
      }
    );
  }

}
