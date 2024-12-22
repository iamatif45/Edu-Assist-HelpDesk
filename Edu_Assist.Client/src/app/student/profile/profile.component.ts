import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/users.service';
import { StudentService, StudentProfile } from '../../services/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  user: any = null;  // Store logged-in user
  studentProfile: StudentProfile | null = null;  // Store student profile
  isEditable: boolean = false;  // Flag to enable form editing
  userId: number = 0;  // User ID
  studentId: number = 0;  // Student Profile ID
  profilePicFile: File | null = null;  // Store selected profile picture

  // Fields for validation errors
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

  // Toggle the editable state for profile update
  toggleEdit(): void {
    this.isEditable = !this.isEditable;
  }

  // Function to validate the first name
  validateFirstName(firstName: string): boolean {
    const regex = /^[A-Za-z]+$/;  // Only letters, no numbers or special characters
    if (firstName.length < 2 || !regex.test(firstName)) {
      this.firstNameError = 'First name must be at least 2 characters long and contain only letters.';
      return false;
    }
    this.firstNameError = '';  // Clear error if valid
    return true;
  }

  // Function to validate the last name
  validateLastName(lastName: string): boolean {
    const regex = /^[A-Za-z]+$/;  // Only letters, no numbers or special characters
    if (lastName.length < 4 || !regex.test(lastName)) {
      this.lastNameError = 'Last name must be at least 4 characters long and contain only letters.';
      return false;
    }
    this.lastNameError = '';  // Clear error if valid
    return true;
  }

  // Function to validate contact number
  validateContact(contact: string): boolean {
    const regex = /^[1-9]{1}[0-9]{9}$/;  // 10 digits, must not start with 0
    if (contact.length !== 10 || !regex.test(contact)) {
      this.contactError = 'Contact number must be 10 digits and must not start with 0.';
      return false;
    }
    this.contactError = '';  // Clear error if valid
    return true;
  }

  // Function to validate the address
  validateAddress(address: string): boolean {
    const wordCount = address.trim().split(/\s+/).length;

    // Regex to allow letters, numbers, spaces, commas, colons, and hyphens
    const regex = /^[A-Za-z0-9\s,:-]+$/;  // Only letters, numbers, spaces, commas, colons, and hyphens

    // Ensure there are no repeated special characters like : : : or , , ,
    const invalidRepetitiveChars = /([:,\-])\s*\1/;  // Detects repeated special characters with optional spaces

    // Ensure the address does not contain sequences of numbers like "1 1 3 4 5"
    const invalidNumberSequence = /\b(\d+(\s+\d+)+)\b/;  // Detects sequences of numbers separated by spaces

    // Check if the address is valid:
    // - It must contain at least 3 words.
    // - It must match the allowed characters regex.
    // - It must not have consecutive special characters.
    // - It must not contain a sequence of numbers.
    if (
      wordCount < 3 || 
      !regex.test(address) || 
      invalidRepetitiveChars.test(address) ||
      invalidNumberSequence.test(address)
    ) {
      this.addressError = 'Address must contain at least 3 words and can only include letters, numbers, spaces, commas, colons, and hyphens. It cannot contain consecutive special characters like ": : :", "- - -", or ", , ,", and cannot have sequences of numbers separated by spaces.';
      return false;
    }

    this.addressError = '';  // Clear error if valid
    return true;
  }

  // Handle profile update submission
  onSubmit(): void {
    this.isSubmitted = true;  // Mark the form as submitted

    if (this.studentProfile) {
      // Validate fields before submission
      const isFirstNameValid = this.validateFirstName(this.studentProfile.FirstName);
      const isLastNameValid = this.validateLastName(this.studentProfile.LastName);
      const isContactValid = this.validateContact(this.studentProfile.Contact);
      const isAddressValid = this.validateAddress(this.studentProfile.StudentAddress);

      if (!isFirstNameValid || !isLastNameValid || !isContactValid || !isAddressValid) {
        return;  // Stop submission if any validation fails
      }

      // Only submit if profile data is valid
      this.studentService.updateStudentProfile(this.studentId, this.studentProfile, this.profilePicFile).subscribe(
        (response) => {
          console.log('Profile updated successfully');
          this.isEditable = false;  // Disable editing after successful update
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }

  // Handle profile picture selection
  onProfilePicChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.profilePicFile = event.target.files[0];
    }
  }

  // Cancel the editing and restore the original profile data
  cancelEdit(): void {
    if (this.studentProfile) {
      this.studentProfile = { ...this.studentProfile };  // Restore original profile data
      this.isEditable = false;
    }
  }
}
