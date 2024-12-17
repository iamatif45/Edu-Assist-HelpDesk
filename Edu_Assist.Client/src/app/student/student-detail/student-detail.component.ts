import { Component, OnInit } from '@angular/core';
import { StudentService, StudentProfile } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  studentId: number;
  student: StudentProfile | undefined;

  constructor(private studentService: StudentService, private router: Router) {
    // Get userId from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.studentId = user.userId;  // Assuming user object contains the userId
  }

  ngOnInit(): void {
    // Fetch the student details using the userId
    if (this.studentId) {
      this.studentService.getStudentByUserId(this.studentId).subscribe(
        (data: StudentProfile) => {
          this.student = data;

          // Store the student data in localStorage
          localStorage.setItem('student', JSON.stringify(this.student));
        },
        (error) => {
          console.error('Error fetching student details:', error);
        }
      );
    }
  }
}
