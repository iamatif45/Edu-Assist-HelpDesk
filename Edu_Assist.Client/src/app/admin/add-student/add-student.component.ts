import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/users.service';
import { StudentService, StudentProfile } from '../../services/student.service';
import { CoursesService, Course } from '../../services/courses.service'; 

@Component({
  selector: 'app-register-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class RegisterStudentComponent implements OnInit {
  user = {
    Username: '',
    PasswordHash: '',  // You should handle password hashing securely
    Email: '',
    RoleId: 3,  // Student role
    IsActive: true
  };

  student = {
    FirstName: '',
    LastName: '',
    Gender: '',
    Dob: '',
    Contact: '',
    StudentAddress: '',
    CourseId: 0,
    AcademicYear: 0,
    ProfilePic: null as File | null
  };

  courses: Course[] = []; // List of courses to populate the dropdown
  successMessage: string = '';
  errorMessage: string = '';
  usernameTaken: boolean = false;  // Flag to indicate if username is taken
  usernameChecked: boolean = false;  // Flag to indicate if username check is completed

  constructor(
    private userService: UserService,
    private studentService: StudentService,
    private router: Router,
    private coursesService: CoursesService // Inject CoursesService
  ) {}

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses; 
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.errorMessage = 'Failed to load courses. Please try again later.';
      }
    });
  }

  // Check if username is already taken
  onUsernameChange() {
    if (this.user.Username.length >= 8) {
      this.userService.checkUsernameAvailability(this.user.Username).subscribe({
        next: (isTaken) => {
          this.usernameTaken = isTaken;
          this.usernameChecked = true;
        },
        error: (err) => {
          console.error('Error checking username:', err);
          this.errorMessage = 'Error checking username availability.';
        }
      });
    } else {
      this.usernameChecked = false; // Reset if the username is not long enough
      this.usernameTaken = false;
    }
  }
  // Handle file input for student profile picture
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.ProfilePic = file;
    }
  }

  // Form validation for the user and student profile
  validateForm(): boolean {
    return true; // Add your additional validation logic here
  }

  isOldPasswordVisible: boolean = false;
  isNewPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  togglePasswordVisibility(field: string) {
    if (field === 'old') {
      this.isOldPasswordVisible = !this.isOldPasswordVisible;
    } else if (field === 'new') {
      this.isNewPasswordVisible = !this.isNewPasswordVisible;
    } else if (field === 'confirm') {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    }
  }

  onRegister(form: NgForm) {
    if (form.valid && !this.usernameTaken) {
      const newUser: User = {
        Username: this.user.Username,
        PasswordHash: this.user.PasswordHash, 
        Email: this.user.Email,
        RoleId: 3, 
        IsActive: this.user.IsActive,
        UserId: undefined
      };

      this.userService.createUser(newUser).subscribe({
        next: (userResponse) => {
          this.successMessage = 'User created successfully! Now registering the student profile...';
          const newStudent: StudentProfile = {
            StudentProfileId: 0,
            UserId: parseInt(userResponse.UserId.toString(), 10), 
            FirstName: this.student.FirstName,
            LastName: this.student.LastName,
            Gender: this.student.Gender,
            Dob: this.student.Dob,
            Contact: this.student.Contact,
            StudentAddress: this.student.StudentAddress,
            CourseId: this.student.CourseId, 
            AcademicYear: this.student.AcademicYear,
            ProfilePic: this.student.ProfilePic ? this.student.ProfilePic.name : ''
          };

          this.studentService.createStudentProfile(newStudent, this.student.ProfilePic).subscribe({
            next: (studentResponse) => {
              this.successMessage = 'Student profile registered successfully!';
              form.reset(); 
              this.router.navigate(['/admin']);
            },
            error: (err) => {
              this.errorMessage = 'Error registering student profile: ' + err;
              console.error(err);
            }
          });
        },
        error: (err) => {
          this.errorMessage = 'Error creating user: ' + err;
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Please fill in all the required fields correctly.';
    }
  }
}
