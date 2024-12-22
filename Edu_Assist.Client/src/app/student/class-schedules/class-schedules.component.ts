import { Component, OnInit, Input } from '@angular/core';
// import { ClassSchedulesService, ClassSchedule } from 'src/app/services/classschedules.service';
import { ClassSchedulesService,ClassSchedule } from '../../services/classschedule.service';
@Component({
  selector: 'app-class-schedule',  // Change selector name here
  templateUrl: './class-schedules.component.html',  // Update template file name
  styleUrls: ['./class-schedules.component.css']  // Update CSS file name
})
export class ClassScheduleComponent implements OnInit {
  courseId: number = 0;  // Input property to pass the courseId from parent component
  classSchedules: ClassSchedule[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private classSchedulesService: ClassSchedulesService) {
        // Get the student object from localStorage
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
      this.loadClassSchedulesByCourseId(this.courseId);
    }
  }

  loadClassSchedulesByCourseId(CourseId: number): void {
    this.isLoading = true;
    this.classSchedulesService.getClassScheduleByCourseId(CourseId).subscribe(
      (data) => {
        this.classSchedules = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error loading class schedules. Please try again later.';
        this.isLoading = false;
      }
    );
  }
  // Method to download the schedule as a CSV file
  downloadSchedule(): void {
    const csvData = this.convertToCSV(this.classSchedules);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    // Create an invisible download link
    const link = document.createElement('a');
    if (link.download !== undefined) { // feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'class_schedule.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Convert class schedule data to CSV format
  convertToCSV(data: ClassSchedule[]): string {
    const headers = ['Schedule ID', 'Subject ID', 'Start Time', 'End Time', 'Day of Week'];
    const rows = data.map(schedule => [
      schedule.ScheduleId,
      schedule.SubjectId,
      schedule.StartTime,
      schedule.EndTime,
      schedule.DayOfWeek
    ]);

    // Combine headers and rows into CSV format
    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    return csv;
  }
  printSchedule(): void {
    window.print();
  }
}
