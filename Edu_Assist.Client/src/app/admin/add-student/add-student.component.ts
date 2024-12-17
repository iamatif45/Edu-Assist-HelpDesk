import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {

  student = {
    userId: 0,           // Add UserId here
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    contact: '',
    studentAddress: '',
    courseId: 0,        // Default value (make sure this value is valid in your backend)
    academicYear: 0,    // Default value
    profilePic: null as File | null,  // Can be set later
  };
  
  errorMessage: string | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  // Handle file input
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.profilePic = file;
    }
  }

  // Submit form data
  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData: FormData = new FormData();
      formData.append('userId', this.student.userId.toString())
      formData.append('firstName', this.student.firstName);
      formData.append('lastName', this.student.lastName);
      formData.append('gender', this.student.gender);
      formData.append('dob', this.student.dob);
      formData.append('contact', this.student.contact);
      formData.append('studentAddress', this.student.studentAddress);
      formData.append('courseId', this.student.courseId.toString());
      formData.append('academicYear', this.student.academicYear.toString());
      if (this.student.profilePic) {
        formData.append('profilePic', this.student.profilePic, this.student.profilePic.name);
      }

      const token = localStorage.getItem('jwt');

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Send HTTP POST request to add student
      this.http.post('http://localhost:5000/api/students/upload', formData, {
        headers
      })
      .subscribe({
        next: (response) => {
          // On success, redirect to student list or show success message
          this.router.navigate(['/admin/add-student']); // or wherever you want to redirect
        },
        error: (error) => {
          console.error('Error adding student profile:', error);
          this.errorMessage = 'Failed to add student profile. Please try again later.';
        }
      });
    } else {
      // Handle form validation failure
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
