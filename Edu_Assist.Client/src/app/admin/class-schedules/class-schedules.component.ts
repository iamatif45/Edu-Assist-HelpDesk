import { Component, OnInit } from '@angular/core';
import { ClassSchedulesService } from '../../services/classschedule.service';
import { SubjectService } from '../../services/subject.service';
import { CoursesService } from '../../services/courses.service';

interface ClassSchedule {
  ScheduleId: number;
  SubjectId: number;
  CourseId: number;
  StartTime: string;
  EndTime: string;
  DayOfWeek: string;
}

@Component({
  selector: 'app-admin-class-schedule',
  templateUrl: './class-schedules.component.html',
  styleUrls: ['./class-schedules.component.css']
})
export class AdminClassScheduleComponent implements OnInit {
  classSchedules: ClassSchedule[] = [];
  filteredClassSchedules: ClassSchedule[] = [];
  searchQuery: string = '';
  showForm: boolean = false;
  selectedClassSchedule: ClassSchedule | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  searchErrorMessage: string = '';

  // Arrays for dropdown options
  subjects: { SubjectId: number, SubjectName: string }[] = [];
  courses: { CourseId: number, CourseName: string, Branch: string }[] = [];
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Form data (to bind with ngModel in the template)
  newClassSchedule: ClassSchedule = {
    ScheduleId: 0,
    SubjectId: 0,
    CourseId: 0,
    StartTime: '',
    EndTime: '',
    DayOfWeek: ''
  };
selectedSchedule: any;
validateStartTime: any;
validateEndTime: any;

  constructor(
    private classSchedulesService: ClassSchedulesService,
    private subjectService: SubjectService,
    private courseService: CoursesService
  ) { }

  ngOnInit(): void {
    this.getSubjects();
    this.getCourses();
    this.getClassSchedules();
  }

  // Fetch all subjects from the service
  getSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (data: { SubjectId: number, SubjectName: string }[]) => {
        this.subjects = data;
      },
      error => {
        this.errorMessage = 'Failed to load subjects';
      }
    );
  }

  // Fetch all courses from the service
  getCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (data: { CourseId: number, CourseName: string, Branch: string }[]) => {
        this.courses = data;
      },
      error => {
        this.errorMessage = 'Failed to load courses';
      }
    );
  }

  // Fetch all class schedules from the service
  getClassSchedules(): void {
    this.classSchedulesService.getAllClassSchedules().subscribe(
      (data: ClassSchedule[]) => {
        this.classSchedules = data;
        this.filteredClassSchedules = data;
      },
      error => {
        this.errorMessage = 'Failed to load class schedules';
      }
    );
  }

  // Filter class schedules based on the search query
  filterClassSchedules(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredClassSchedules = this.classSchedules;
    } else {
      this.filteredClassSchedules = this.classSchedules.filter(schedule =>
        schedule.ScheduleId.toString().includes(this.searchQuery) ||
        schedule.SubjectId.toString().includes(this.searchQuery) ||
        schedule.CourseId.toString().includes(this.searchQuery)
      );

      this.searchErrorMessage = this.filteredClassSchedules.length === 0 ? 'No schedules found' : '';
    }
  }

  // Toggle the form to show/hide
  toggleForm(classSchedule: ClassSchedule | null = null): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      if (classSchedule) {
        // Pre-fill form with selected schedule for editing
        this.selectedClassSchedule = { ...classSchedule };
        this.newClassSchedule = { ...classSchedule };
      } else {
        // Reset form for new class schedule
        this.selectedClassSchedule = null;
        this.newClassSchedule = {
          ScheduleId: 0,
          SubjectId: 0,
          CourseId: 0,
          StartTime: '',
          EndTime: '',
          DayOfWeek: ''
        };
      }
    } else {
      // Hide the form and reset it
      this.selectedClassSchedule = null;
      this.newClassSchedule = {
        ScheduleId: 0,
        SubjectId: 0,
        CourseId: 0,
        StartTime: '',
        EndTime: '',
        DayOfWeek: ''
      };
    }
  }

  // Save class schedule (either create or update)
  saveClassSchedule(form): void {
    if (form.invalid) {
      return;
    }

    if (this.selectedClassSchedule) {
      this.updateClassSchedule(this.newClassSchedule);
    } else {
      this.createClassSchedule(this.newClassSchedule);
    }
  }

  // Create a new class schedule
  createClassSchedule(classSchedule: ClassSchedule): void {
    this.classSchedulesService.addClassSchedule(classSchedule).subscribe(
      () => {
        this.successMessage = 'Class schedule created successfully';
        this.getClassSchedules(); // Refresh the list of schedules
        this.toggleForm(); // Close the form
      },
      (error) => {
        this.errorMessage = 'Error creating class schedule. Please try again later.';
      }
    );
  }

  // Update an existing class schedule
  updateClassSchedule(classSchedule: ClassSchedule): void {
    if (!this.selectedClassSchedule) return;

    this.classSchedulesService.updateClassSchedule(this.selectedClassSchedule.ScheduleId, classSchedule).subscribe(
      () => {
        this.successMessage = 'Class schedule updated successfully';
        this.getClassSchedules(); // Refresh the list
        this.toggleForm(); // Close the form
      },
      (error) => {
        this.errorMessage = 'Error updating class schedule. Please try again later.';
      }
    );
  }

  // Delete a class schedule by ID
  deleteClassSchedule(scheduleId: number): void {
    this.classSchedulesService.deleteClassSchedule(scheduleId).subscribe(
      () => {
        this.successMessage = 'Class schedule deleted successfully';
        this.getClassSchedules(); // Refresh the list
      },
      (error) => {
        this.errorMessage = 'Error deleting class schedule. Please try again later.';
      }
    );
  }

  // Get the subject by its ID
  getSubjectById(subjectId: number) {
    return this.subjects.find(subject => subject.SubjectId === subjectId);
  }

  // Get the course by its ID
  getCourseById(courseId: number) {
    return this.courses.find(course => course.CourseId === courseId);
  }
}
