import { Component, OnInit } from '@angular/core';

import { StudentService,StudentProfile } from '../../services/student.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentsComponent implements OnInit {
  students: StudentProfile[] = [];
  filteredStudents: StudentProfile[] = [];
  searchControl: FormControl = new FormControl('');
  errorMessage: string = '';
  successMessage: string = '';
  hoveredCardId: number | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
    this.searchControl.valueChanges.subscribe(value => this.filterStudents(value));
  }

  // Fetch all students from the service
  loadStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (data) => {
        this.students = data;
        this.filteredStudents = data;
      },
      (error) => {
        this.errorMessage = 'Error loading students. Please try again later.';
      }
    );
  }

  // Filter students based on search term
  filterStudents(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredStudents = this.students;
    } else {
      const lowerCaseTerm = searchTerm.toLowerCase();
      this.filteredStudents = this.students.filter(student => 
        student.FirstName.toLowerCase().includes(lowerCaseTerm) ||
        student.LastName.toLowerCase().includes(lowerCaseTerm) ||
        student.StudentProfileId.toString().includes(lowerCaseTerm)
      );
    }
    
    if (this.filteredStudents.length === 0) {
      this.errorMessage = 'No students found. Please try another search.';
    } else {
      this.errorMessage = '';
    }

  }
  onCardHover(studentId: number): void {
    this.hoveredCardId = studentId;
  }

  onCardLeave(studentId: number): void {
    if (this.hoveredCardId === studentId) {
      this.hoveredCardId = null;
    }
  }
}
