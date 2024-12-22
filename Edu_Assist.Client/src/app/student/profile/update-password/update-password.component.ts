import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../../../services/users.service';
import { StudentProfile, StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  user: any = null;  // Store logged-in user
  studentProfile: StudentProfile | null = null;  // Store student profile
  isEditable: boolean = false;  // Flag to enable form editing
  userId: number = 0;  // User ID
  studentId: number = 0;  // Student Profile ID
  profilePicFile: File | null = null;  // Store selected profile picture

  // Password fields for changing password
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordError: string = '';  // Store password error messages
  passwordSuccessMessage: string = '';  // Store password success message

  // Fields for validation
  firstNameError: string = '';
  lastNameError: string = '';
  contactError: string = '';
  addressError: string = '';

  isSubmitted: boolean = false;  // Flag to track form submission

  constructor(
    private userService: UserService,
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieve user data from localStorage
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson);
      this.userId = this.user.userId;
    }

    // Fetch the student profile by userId
    if (this.userId) {
      this.studentService.getStudentByUserId(this.userId).subscribe(
        (profile) => {
          this.studentProfile = profile;
          this.studentId = profile.StudentProfileId;
        },
        (error) => {
          console.error('Error fetching student profile:', error);
        }
      );
    }
  }

  isOldPasswordVisible: boolean = false;
  isNewPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  // Function to toggle password visibility
  togglePasswordVisibility(field: string) {
    if (field === 'old') {
      this.isOldPasswordVisible = !this.isOldPasswordVisible;
    } else if (field === 'new') {
      this.isNewPasswordVisible = !this.isNewPasswordVisible;
    } else if (field === 'confirm') {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    }
  }

  // Handle password change
  onChangePassword(): void {
    this.passwordError = '';  // Reset any previous error messages
    this.passwordSuccessMessage = '';  // Clear previous success message

    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'New password and confirm password do not match.';
      return;
    }

    if (this.newPassword.length < 8) {
      this.passwordError = 'Password must be at least 8 characters long.';
      return;
    }

    const userData: User = {
      UserId: this.userId,
      Username: this.user.username,
      PasswordHash: this.newPassword,
      Email: this.user.email,
      RoleId: this.user.roleId,
      IsActive: this.user.isActive
    };

    this.userService.updatePassword(this.user.username, this.oldPassword, userData).subscribe(
      (response) => {
        this.passwordSuccessMessage = 'Password changed successfully!';  // Show success message
        localStorage.removeItem('jwt');  // Remove the JWT token after successful change
        this.router.navigateByUrl('/student/profile/update-password');  // Navigate to the same page to reset form and display success message

        // Reset form fields
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.passwordError = '';
      },
      (error) => {
        console.error('Error changing password:', error);
        this.passwordError = 'Error changing password. Please check your old password and try again.';
      }
    );
  }
}
