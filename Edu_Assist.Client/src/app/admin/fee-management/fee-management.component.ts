import { Component, OnInit } from '@angular/core';
import { StudentService, StudentProfile } from '../../services/student.service';
import { FeeRecordService, FeePaymentRecord } from '../../services/fee-record.service';

@Component({
  selector: 'app-student-fee-record',
  templateUrl: './fee-management.component.html',
  styleUrls: ['./fee-management.component.css']
})
export class StudentFeeRecordComponent implements OnInit {
  students: StudentProfile[] = [];               // List of students
  selectedStudentId: number | null = null;        // ID of the selected student
  feeRecords: FeePaymentRecord[] = [];            // List of fee records for the selected student
  newFeeRecord: FeePaymentRecord = {              // Form data for new fee record
    PaymentId: 0,
    StudentId: 0,
    TotalFee: 0,
    PaidFee: 0,
    PendingFee: 0,
    PaymentYear: new Date().getFullYear(),
    Created: new Date().toISOString()
  };

  searchQuery: string = '';                       // Search query for students
  searchErrorMessage: string = '';                // Error message for search
  feeErrorMessage: string = '';                   // Error message for fee record creation

  constructor(
    private studentService: StudentService,
    private feeRecordService: FeeRecordService
  ) { }

  ngOnInit(): void {
    // Load all students when the component initializes
    this.loadStudents();
  }

  // Load all students from the service
  loadStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  // Select a student and load their fee records
  selectStudent(studentId: number): void {
    this.selectedStudentId = studentId;
    this.loadFeeRecords(studentId);
  }

  // Load fee records for the selected student
  loadFeeRecords(studentId: number): void {
    this.feeRecordService.getFeeRecordByStudentId(studentId).subscribe(
      (data) => {
        // Ensure the response is an array (even if a single record is returned)
        this.feeRecords = Array.isArray(data) ? data : [data];
      },
      (error) => {
        console.error('Error fetching fee records:', error);
      }
    );
  }

  // Filter students based on search query (Student ID or Name)
  filterStudents(): void {
    const query = this.searchQuery.toLowerCase();
    this.students = this.students.filter(student =>
      student.StudentProfileId.toString().includes(query) ||
      student.FirstName.toLowerCase().includes(query) ||
      student.LastName.toLowerCase().includes(query)
    );

    // Show error message if no students match the search query
    if (this.students.length === 0) {
      this.searchErrorMessage = 'No students found for the given search query.';
    } else {
      this.searchErrorMessage = '';
    }
  }

  // Create a new fee record for the selected student
  createFeeRecord(): void {
    if (this.selectedStudentId !== null) {
      // First, check if the student has fee records
      this.feeRecordService.getFeeRecordByStudentId(this.selectedStudentId).subscribe(
        (data) => {
          // Ensure that we have an array of records
          this.feeRecords = Array.isArray(data) ? data : [data];  // Wrap the response in an array if it's not already
  
          // Filter the most recent fee record for the selected year
          const recentRecordForYear = this.feeRecords
            .filter(record => record.PaymentYear === this.newFeeRecord.PaymentYear) // Filter records by payment year
            .sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime())[0]; // Sort by created date and pick the most recent one
  
          // If a recent record exists and its PendingFee is zero, do not insert the new record
          if (recentRecordForYear && recentRecordForYear.PendingFee === 0) {
            this.feeErrorMessage = `The most recent fee record for the year ${this.newFeeRecord.PaymentYear} has a remaining fee of zero. No new fee record can be created.`;
            return; // Prevent inserting the new record
          }

          if (recentRecordForYear && this.newFeeRecord.PaidFee > recentRecordForYear.PendingFee) {
            this.feeErrorMessage = `The remaining fee amount is ${recentRecordForYear.PendingFee}.`;
            return; // Prevent inserting the new record
          }
  
          // Proceed with fee record creation
          this.newFeeRecord.StudentId = this.selectedStudentId;
          this.feeRecordService.addFeeRecord(this.newFeeRecord).subscribe(
            (createdRecord) => {
              // Fetch the updated fee records from the database
              this.feeRecordService.getFeeRecordByStudentId(this.selectedStudentId).subscribe(
                (updatedRecords) => {
                  // Update the feeRecords with the latest data from the database
                  this.feeRecords = Array.isArray(updatedRecords) ? updatedRecords : [updatedRecords];
                  this.resetFeeRecordForm();   // Reset the fee record form
                },
                (error) => {
                  console.error('Error fetching updated fee records:', error);
                }
              );
            },
            (error) => {
              console.error('Error creating fee record:', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching fee records:', error);
        }
      );
    }
  }
  
  
  // Reset the form for creating a new fee record
  resetFeeRecordForm(): void {
    this.newFeeRecord = {
      PaymentId: 0,
      StudentId: 0,
      TotalFee: 0,
      PaidFee: 0,
      PendingFee: 0,
      PaymentYear: new Date().getFullYear(),
      Created: new Date().toISOString()
    };
    this.feeErrorMessage = ''; // Reset the error message
  }
}
