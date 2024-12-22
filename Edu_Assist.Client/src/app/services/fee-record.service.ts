
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the FeePaymentRecord interface to match the new API response
export interface FeePaymentRecord {
  PaymentId: number;
  StudentId: number;
  TotalFee: number;
  PaidFee: number;
  PendingFee: number;
  PaymentYear: number;
  Created: string; // ISO date string
}

@Injectable({
  providedIn: 'root',
})
export class FeeRecordService {
  private apiUrl = 'http://localhost:5000/api/FeePaymentRecords'; // Adjust this based on your environment settings

  constructor(private http: HttpClient) {}

  // Private method to get the authentication token from localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Private method to get the Authorization header
  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Fetch all fee records (Admin, Staff roles)
  getAllFeeRecords(): Observable<FeePaymentRecord[]> {
    return this.http.get<FeePaymentRecord[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  // Fetch fee record by payment ID (Admin, Staff roles)
  getFeeRecordById(id: number): Observable<FeePaymentRecord> {
    return this.http.get<FeePaymentRecord>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Fetch fee record by student ID (Admin, Staff, and Student roles)
  getFeeRecordByStudentId(id: number): Observable<FeePaymentRecord> {
    return this.http.get<FeePaymentRecord>(`${this.apiUrl}/fee/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Add a new fee payment record (Admin, Staff roles)
  addFeeRecord(feePayment: FeePaymentRecord): Observable<FeePaymentRecord> {
    return this.http.post<FeePaymentRecord>(this.apiUrl, feePayment, {
      headers: this.getHeaders(),
    });
  }

  // Update an existing fee payment record (Admin, Staff roles)
  updateFeeRecord(id: number, feePayment: FeePaymentRecord): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, feePayment, {
      headers: this.getHeaders(),
    });
  }

  // Delete a fee payment record (Admin only)
  deleteFeeRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
