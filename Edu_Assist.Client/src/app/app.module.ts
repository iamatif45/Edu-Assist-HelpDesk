import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { StaffComponent } from './staff/staff.component';
import { FormsModule} from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { AddStudentComponent } from './admin/add-student/add-student.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { StudentService } from './services/student.service';
import { StudentNavbarComponent } from './student/student-nav/student-nav.component';
import { CourseDetailComponent } from './student/course-detail/course-detail.component';
import { FeeRecordComponent } from './student/fee-record/fee-record.component';
import { ActivitiesComponent } from './student/activities/activities.component';
import { PlacementDrivesComponent } from './student/placementdrives/placementdrives.component';
import { ClassScheduleComponent } from './student/class-schedules/class-schedules.component';
import { FeedbackComponent } from './student/feedback/feedback.component';
import { ExamScheduleComponent } from './student/exam-schedule/exam-schedule.component';
import { CreateTicketComponent } from './student/create-ticket/create-ticket.component';
import { TicketTicketLogComponent } from './student/ticket-ticketlog/ticket-ticketlog.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { TicketLogComponent } from './admin/ticket-ticketlog/ticket-ticketlog.component';
import { StudentProfileComponent } from './student/profile/profile.component';
import { UpdatePasswordComponent } from './student/profile/update-password/update-password.component';
import { FeedbackListComponent } from './admin/feedback-list/feedback-list.component';
import { AdminActivityListComponent } from './admin/admin-activities/admin-activities.component';


export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent,
    StaffComponent,
    AdminComponent,
    AddStudentComponent,
    StudentDetailComponent,
    StudentNavbarComponent,
    CourseDetailComponent,
    FeeRecordComponent,
    ActivitiesComponent,
    PlacementDrivesComponent,
    ClassScheduleComponent,
    FeedbackComponent,
    ExamScheduleComponent,
    CreateTicketComponent,
    TicketTicketLogComponent,
    AdminNavbarComponent,
    TicketLogComponent,
    StudentProfileComponent,
    UpdatePasswordComponent,
    FeedbackListComponent,
    AdminActivityListComponent
    
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    }),
    HttpClientModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
