import { Component, OnInit } from '@angular/core';
import { UserService,User } from '../../services/users.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isEditing: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  newUser: User = {
    UserId: 0,
    Username: '',
    PasswordHash: '',
    Email: '',
    RoleId: 1,  // Set default to Admin
    IsActive: true,
  };
usernameTaken: boolean = false;  // Flag to indicate if username is taken
  usernameChecked: boolean = false;  // Flag to indicate if username check is completed


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers(); 
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
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

  

  onUsernameChange() {
    if (this.newUser.Username.length >= 8) {
      this.userService.checkUsernameAvailability(this.newUser.Username).subscribe({
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
  createUser(): void {
    this.userService.createUser(this.newUser).subscribe(
      (user) => {
        this.successMessage = 'User created successfully!';
        this.getUsers(); 
        this.resetForm(); 
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.isEditing = true;
    this.newUser = { ...user }; 
  }

  updateUser(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.Username, this.newUser).subscribe(
        () => {
          this.successMessage = 'User updated successfully!';
          this.getUsers(); 
          this.resetForm(); 
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }

  deleteUser(username: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(username).subscribe(
        () => {
          this.successMessage = 'User deleted successfully!';
          this.getUsers(); 
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }

  resetForm(): void {
    this.newUser = {
      UserId: 0,
      Username: '',
      PasswordHash: '',
      Email: '',
      RoleId: 1,
      IsActive: true,
    };
    this.selectedUser = null;
    this.isEditing = false;
  }
}
