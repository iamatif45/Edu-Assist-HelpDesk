
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface representing a Placement Drive
export interface PlacementDrive {
  DriveId: number;
  CompanyName: string;
  JobTitle: string;
  EligibilityCriteria?: string;
  DriveDate: string; // Date as string
  StartTime: string; // Time as string
  EndTime: string;   // Time as string
  Location: string;
  OrganizedBy: string;
  Status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacementDriveService {

  private apiUrl = 'http://localhost:5000/api/PlacementDrive'; // API endpoint for Placement Drives

  constructor(private http: HttpClient) { }

  private getAuthToken(): string | null {
    return localStorage.getItem('jwt');
  }


  // Helper method to get the headers with JWT token
  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }


  // Fetch all placement drives (GET request)
  getAllPlacementDrives(): Observable<PlacementDrive[]> {
    return this.http.get<PlacementDrive[]>(this.apiUrl, {
      headers: this.getHeaders()  // Add JWT token in the request headers
    });
  }

  // Fetch a placement drive by ID (GET request)
  getPlacementDriveById(driveId: number): Observable<PlacementDrive> {
    return this.http.get<PlacementDrive>(`${this.apiUrl}/${driveId}`, {
      headers: this.getHeaders()  // Add JWT token in the request headers
    });
  }

  // Create a new placement drive (POST request)
  createPlacementDrive(placementDrive: PlacementDrive): Observable<PlacementDrive> {
    return this.http.post<PlacementDrive>(this.apiUrl, placementDrive, {
      headers: this.getHeaders()  // Add JWT token in the request headers
    });
  }

  // Update an existing placement drive (PUT request)
  updatePlacementDrive(driveId: number, placementDrive: PlacementDrive): Observable<PlacementDrive> {
    return this.http.put<PlacementDrive>(`${this.apiUrl}/${driveId}`, placementDrive, {
      headers: this.getHeaders()  // Add JWT token in the request headers
    });
  }

  // Delete a placement drive (DELETE request)
  deletePlacementDrive(driveId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${driveId}`, {
      headers: this.getHeaders()  // Add JWT token in the request headers
    });
  }
}
