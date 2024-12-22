import { Component, OnInit } from '@angular/core';
import { ExamScheduleService, ExamScheduleDisplay } from '../../services/examschedules.service';
import { ActivatedRoute } from '@angular/router'; // To get the route parameter (courseId)

@Component({
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.css'],
})
export class ExamScheduleComponent implements OnInit {
  courseId: number = 0;  // Will hold the courseId from route
  examSchedules: ExamScheduleDisplay[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(
    private examScheduleService: ExamScheduleService,
    private route: ActivatedRoute // To fetch the courseId from URL
  ) {
    const student = JSON.parse(localStorage.getItem('student') || '{}');

    // Check if courseId exists in the student object
    if (student && student.CourseId) {
      // Parse the courseId to a number
      this.courseId = parseInt(student.CourseId, 10);
    } else {
      this.errorMessage = 'Course ID not found in local storage';
    }
  }

  ngOnInit(): void {
    if (this.courseId) {
      this.loadExamSchedules();
    } else {
      this.errorMessage = 'Course ID is invalid or missing.';
      this.isLoading = false;
    }
  }

  loadExamSchedules(): void {
    this.isLoading = true;
    this.examScheduleService.getExamSchedulesByCourseId(this.courseId).subscribe(
      (data) => {
        this.examSchedules = data;  // Set the fetched exam schedules
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load exam schedules.';
        this.isLoading = false;
      }
    );
  }

  // Method to trigger the print functionality
  printSchedule(): void {
    window.print();
  }
}
