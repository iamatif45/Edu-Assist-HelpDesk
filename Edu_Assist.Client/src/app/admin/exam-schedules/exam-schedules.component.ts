import { Component, OnInit } from '@angular/core';
import { ExamScheduleService } from '../../services/examschedules.service';
import { SubjectService } from '../../services/subject.service';
import { CoursesService } from '../../services/courses.service';

interface ExamSchedule {
  ExamScheduleId: number;
  ExamId: number;  // Added missing properties
  SubjectId: number;
  SubjectName: string;  // If the service returns this
  CourseId: number;
  CourseName: string;
  Branch: string;
  ExamDate: string;
  StartTime: string;
  EndTime: string;
  DayOfWeek: string;
  Room: string;  // If the service returns this
}

@Component({
  selector: 'app-admin-exam-schedule',
  templateUrl: './exam-schedules.component.html',
  styleUrls: ['./exam-schedules.component.css']
})
export class AdminExamScheduleComponent implements OnInit {
  examSchedules: ExamSchedule[] = [];
  filteredExamSchedules: ExamSchedule[] = [];
  searchQuery: string = '';
  showForm: boolean = false;
  selectedExamSchedule: ExamSchedule | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  searchErrorMessage: string = '';

  // Arrays for dropdown options
  subjects: { SubjectId: number, SubjectName: string }[] = [];
  courses: { CourseId: number, CourseName: string, Branch: string }[] = [];
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Form data (to bind with ngModel in the template)
  newExamSchedule: ExamSchedule = {
    ExamScheduleId: 0,
    ExamId: 0,  // Default value for ExamId
    SubjectId: 0,
    SubjectName: '',  // Default value for SubjectName
    CourseId: 0,
    CourseName: '',  // Default value for CourseName
    Branch: '',  // Default value for Branch
    ExamDate: '',
    StartTime: '',
    EndTime: '',
    DayOfWeek: '',
    Room: ''  // Default value for Room
  };

  constructor(
    private examSchedulesService: ExamScheduleService,
    private subjectService: SubjectService,
    private courseService: CoursesService
  ) { }

  ngOnInit(): void {
    this.getSubjects();
    this.getCourses();
    this.getExamSchedules();
  }

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

  // Change to `getExamSchedules` as per the service
  getExamSchedules(): void {
    this.examSchedulesService.getExamSchedules().subscribe(
      (data: ExamSchedule[]) => {
        this.examSchedules = data;
        this.filteredExamSchedules = data;
      },
      error => {
        this.errorMessage = 'Failed to load exam schedules';
      }
    );
  }

  // Other methods remain unchanged...

  // Filter exam schedules based on the search query
  filterExamSchedules(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredExamSchedules = this.examSchedules;
    } else {
      this.filteredExamSchedules = this.examSchedules.filter(schedule =>
        schedule.ExamScheduleId.toString().includes(this.searchQuery) ||
        schedule.SubjectId.toString().includes(this.searchQuery) ||
        schedule.CourseId.toString().includes(this.searchQuery)
      );

      this.searchErrorMessage = this.filteredExamSchedules.length === 0 ? 'No schedules found' : '';
    }
  }

  // Toggle the form to show/hide
  toggleForm(examSchedule: ExamSchedule | null = null): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      if (examSchedule) {
        // Pre-fill form with selected schedule for editing
        this.selectedExamSchedule = { ...examSchedule };
        this.newExamSchedule = { ...examSchedule };
      } else {
        // Reset form for new exam schedule
        this.selectedExamSchedule = null;
        this.newExamSchedule = {
          ExamScheduleId: 0,
          SubjectName:'',
          CourseName:'',
          ExamId:0,
          SubjectId: 0,
          CourseId: 0,
          Branch:'',
          ExamDate: '',
          StartTime: '',
          EndTime: '',
          DayOfWeek: '',
          Room:'',
        };
      }
    } else {
      // Hide the form and reset it
      this.selectedExamSchedule = null;
      this.newExamSchedule = {
        ExamScheduleId: 0,
          SubjectName:'',
          CourseName:'',
          ExamId:0,
          SubjectId: 0,
          CourseId: 0,
          Branch:'',
          ExamDate: '',
          StartTime: '',
          EndTime: '',
          DayOfWeek: '',
          Room:'',
      };
    }
  }

  // Save exam schedule (either create or update)
  saveExamSchedule(form): void {
    if (form.invalid) {
      return;
    }
  
    console.log(this.newExamSchedule);  // Log to verify data
  
    // Handle creating or updating exam schedule
    if (this.selectedExamSchedule) {
      this.updateExamSchedule(this.newExamSchedule);
    } else {
      this.createExamSchedule(this.newExamSchedule);
    }
  }
  
  // Create a new exam schedule
  createExamSchedule(examSchedule: ExamSchedule): void {
    this.examSchedulesService.addExamSchedule(examSchedule).subscribe(
      () => {
        this.successMessage = 'Exam schedule created successfully';
        this.getExamSchedules(); // Refresh the list of schedules
        this.toggleForm(); // Close the form
      },
      (error) => {
        this.errorMessage = 'Error creating exam schedule. Please try again later.';
      }
    );
  }

  // Update an existing exam schedule
  updateExamSchedule(examSchedule: ExamSchedule): void {
    if (!this.selectedExamSchedule) return;
    console.log(this.selectedExamSchedule);
    this.examSchedulesService.updateExamSchedule(this.selectedExamSchedule.ExamId, examSchedule).subscribe(
      () => {
        this.successMessage = 'Exam schedule updated successfully';
        this.getExamSchedules(); // Refresh the list
        this.toggleForm(); // Close the form
      },
      (error) => {
        this.errorMessage = 'Error updating exam schedule. Please try again later.';
      }
    );
  }

  // Delete an exam schedule by ID
  deleteExamSchedule(examScheduleId: number): void {
    this.examSchedulesService.deleteExamSchedule(examScheduleId).subscribe(
      () => {
        this.successMessage = 'Exam schedule deleted successfully';
        this.getExamSchedules(); // Refresh the list
      },
      (error) => {
        this.errorMessage = 'Error deleting exam schedule. Please try again later.';
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
