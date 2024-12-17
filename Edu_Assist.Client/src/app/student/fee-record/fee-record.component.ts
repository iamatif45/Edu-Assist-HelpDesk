import { Component, OnInit } from '@angular/core';
import { FeeRecordService, FeePaymentRecord } from '../../services/fee-record.service';

@Component({
  selector: 'app-fee-record',
  templateUrl: './fee-record.component.html',
  styleUrls: ['./fee-record.component.css']
})
export class FeeRecordComponent implements OnInit {
  feeRecords: FeePaymentRecord[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private feeRecordService: FeeRecordService) { }

  ngOnInit(): void {
    this.fetchFeeRecords();
  }

  // Method to fetch fee records by student ID
  fetchFeeRecords(): void {
    const studentId = this.getStudentIdFromLocalStorage();
    if (studentId) {
      this.feeRecordService.getFeeRecordByStudentId(studentId).subscribe(
        (data) => {
          this.feeRecords = Array.isArray(data) ? data : [data]; // Handle both single and multiple records
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = 'Failed to load fee records. Please try again later.';
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'Student ID not found in local storage';
      this.isLoading = false;
    }
  }

  // Helper method to get student ID from local storage
  getStudentIdFromLocalStorage(): number | null {
    const student = JSON.parse(localStorage.getItem('student') || '{}');
    return student?.studentProfileId || null; // Return student ID or null if not found
  }

  getStudentNameFromLocalStorage(): string | null {
    const student = JSON.parse(localStorage.getItem('student') || '{}');
    return student?.firstName +" "+ student?.lastName || null; // Return student ID or null if not found
  }

  // Method to print the receipt for the fee record
  printReceipt(fee: FeePaymentRecord): void {
    // Open a new window to print the receipt
    const printWindow = window.open('', '_blank', 'width=600,height=400');
    
    // Content of the receipt
    printWindow?.document.write(`
      <html>
        <head>
          <title>Fee Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .receipt-header {
              text-align: center;
              font-size: 18px;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding: 8px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="receipt-header">
            <h2>Fee Receipt</h2>
            <p>Student ID: ${fee.StudentId}</p>
            <p>Student Name: ${this.getStudentNameFromLocalStorage()}</p>
            <p>Payment Year: ${fee.PaymentYear}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Total Fee</th>
                <th>Paid Fee</th>
                <th>Pending Fee</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${fee.PaymentId}</td>
                <td>${fee.TotalFee} INR</td>
                <td>${fee.PaidFee} INR</td>
                <td>${fee.PendingFee} INR</td>
                <td>${fee.Created}</td>
              </tr>
            </tbody>
          </table>
          <div style="text-align: center;">
            <button onclick="window.print();">Print</button>
          </div>
        </body>
      </html>
    `);

    // Close the document to trigger the print dialog
    printWindow?.document.close();
  }
}
