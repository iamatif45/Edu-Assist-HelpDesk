
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// StudentProfile interface to map the response data structure
export interface StudentProfile {
  StudentProfileId: number;
  UserId: number;
  FirstName: string;
  LastName: string;
  Gender: string;
  Dob: string;
  Contact: string;
  StudentAddress: string;
  CourseId: number;
  AcademicYear: number;
  ProfilePic: string;  // You may want to handle this differently depending on how the image is used
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/Students';  // Ensure this is the correct base URL

  constructor(private http: HttpClient) {}

  // Get the token from localStorage
  private getAutheToken(): string | null {
    return localStorage.getItem("jwt");
  }

  // Create the HttpHeaders with Authorization header
  private getHeader(): HttpHeaders {
    const token = this.getAutheToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Get all students (Admin role required)
  getAllStudents(): Observable<StudentProfile[]> {
    const headers = this.getHeader();
    return this.http.get<StudentProfile[]>(this.apiUrl, { headers });
  }

  // Get a student by ID (Student role required)
  getStudentById(id: number): Observable<StudentProfile> {
    const headers = this.getHeader();
    return this.http.get<StudentProfile>(`${this.apiUrl}/${id}`, { headers });
  }

  // Get student by UserId (Student role required)
  getStudentByUserId(userId: number): Observable<StudentProfile> {
    const headers = this.getHeader();
    return this.http.get<StudentProfile>(`${this.apiUrl}/student${userId}`, { headers });
  }

  // Post a new student profile (Admin role required)
  createStudentProfile(student: StudentProfile, profilePic: File): Observable<StudentProfile> {
    const formData: FormData = new FormData();
    formData.append('userId', student.UserId.toString());
    formData.append('firstName', student.FirstName);
    formData.append('lastName', student.LastName);
    formData.append('gender', student.Gender);
    formData.append('dob', student.Dob);
    formData.append('contact', student.Contact);
    formData.append('studentAddress', student.StudentAddress);
    formData.append('courseID', student.CourseId.toString());
    formData.append('academicYear', student.AcademicYear.toString());
    formData.append('profilePic', profilePic);

    const headers = this.getHeader();
    return this.http.post<StudentProfile>(`${this.apiUrl}/upload`, formData, { headers });
  }

  // Update a student profile (Student role required)
  updateStudentProfile(id: number, student: StudentProfile, profilePic?: File): Observable<void> {
    const formData: FormData = new FormData();
    if (student.UserId) formData.append('userId', student.UserId.toString());
    if (student.FirstName) formData.append('firstName', student.FirstName);
    if (student.LastName) formData.append('lastName', student.LastName);
    if (student.Gender) formData.append('gender', student.Gender);
    if (student.Dob) formData.append('dob', student.Dob);
    if (student.Contact) formData.append('contact', student.Contact);
    if (student.StudentAddress) formData.append('studentAddress', student.StudentAddress);
    if (student.CourseId) formData.append('courseID', student.CourseId.toString());
    if (student.AcademicYear) formData.append('academicYear', student.AcademicYear.toString());
    if (profilePic) formData.append('profilePic', profilePic);

    const headers = this.getHeader();
    return this.http.put<void>(`${this.apiUrl}/${id}`, formData, { headers });
  }

  // Delete a student profile (Admin role required)
  deleteStudentProfile(id: number): Observable<void> {
    const headers = this.getHeader();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
