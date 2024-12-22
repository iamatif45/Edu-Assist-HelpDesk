// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-course-detail',
//   templateUrl: './course-detail.component.html',
//   styleUrl: './course-detail.component.css'
// })
// export class CourseDetailComponent {

// }

import { Component, OnInit } from '@angular/core';
import { CoursesService, Course } from '../../services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  courseId: number;
  course: Course | undefined;
  errorMessage: string | undefined;

  constructor(private coursesService: CoursesService, private router: Router) {
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
    // Fetch the course details if the courseId is available
    if (this.courseId) {
      this.coursesService.getCourseById(this.courseId).subscribe(
        (data: Course) => {
          this.course = data;
        },
        (error) => {
          console.error('Error fetching course details:', error);
          this.errorMessage = 'Failed to load course details';
        }
      );
    }
  }
}
