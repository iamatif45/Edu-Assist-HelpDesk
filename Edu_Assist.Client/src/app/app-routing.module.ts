import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { CourseDetailComponent } from './student/course-detail/course-detail.component';
import { FeeRecordComponent } from './student/fee-record/fee-record.component';
import { ActivitiesComponent } from './student/activities/activities.component';
import { PlacementDrivesComponent } from './student/placementdrives/placementdrives.component';
import { ClassScheduleComponent } from './student/class-schedules/class-schedules.component';
import { FeedbackComponent } from './student/feedback/feedback.component';
import { ExamScheduleComponent } from './student/exam-schedule/exam-schedule.component';
import { CreateTicketComponent } from './student/create-ticket/create-ticket.component';
import { TicketTicketLogComponent } from './student/ticket-ticketlog/ticket-ticketlog.component';
import { TicketLogComponent } from './admin/ticket-ticketlog/ticket-ticketlog.component';
import { StudentProfileComponent } from './student/profile/profile.component';
import { UpdatePasswordComponent } from './student/profile/update-password/update-password.component';
import { FeedbackListComponent } from './admin/feedback-list/feedback-list.component';
import { AdminActivityListComponent} from './admin/admin-activities/admin-activities.component';
import { RegisterStudentComponent } from './admin/add-student/add-student.component';
import { ViewStudentsComponent } from './admin/view-student/view-student.component';
import {  AdminClassScheduleComponent } from './admin/class-schedules/class-schedules.component';
import { PlacementDriveCreateComponent } from './admin/placement-drive/placement-drive.component';
import { AdminViewDriveComponent } from './admin/view-drive/view-drive.component';
import { StudentFeeRecordComponent } from './admin/fee-management/fee-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AdminExamScheduleComponent } from './admin/exam-schedules/exam-schedules.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  // { path: 'admin/student-profile', component: RegisterStudentComponent, canActivate: [AuthGuard] },
  { path: 'student/student-detail', component: StudentDetailComponent, canActivate: [AuthGuard] },
  { path: 'student/course-detail', component: CourseDetailComponent, canActivate: [AuthGuard] },
  { path: 'student/fee-record', component: FeeRecordComponent, canActivate: [AuthGuard] },
  { path: 'student/activities', component: ActivitiesComponent, canActivate: [AuthGuard] },
  { path: 'student/placementdrives', component: PlacementDrivesComponent, canActivate: [AuthGuard] },
  { path: 'student/class-schedules', component: ClassScheduleComponent, canActivate: [AuthGuard] },
  { path: 'student/exam-schedules', component: ExamScheduleComponent, canActivate: [AuthGuard] },
  { path: 'student/feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
  { path: 'student/create-ticket', component: CreateTicketComponent, canActivate: [AuthGuard] },
  { path: 'student/ticket-ticketlog', component: TicketTicketLogComponent, canActivate: [AuthGuard] },
  { path: 'student/profile', component: StudentProfileComponent, canActivate: [AuthGuard] },
  { path: 'student/profile/update-password', component: UpdatePasswordComponent, canActivate: [AuthGuard] },

  //Admin path
  { path: 'admin/view-student', component: ViewStudentsComponent, canActivate: [AuthGuard] },
  { path: 'admin/ticket-ticketlog', component: TicketLogComponent, canActivate: [AuthGuard] },
  { path: 'admin/feedback-list', component: FeedbackListComponent, canActivate: [AuthGuard] },
  { path: 'admin/activities', component: AdminActivityListComponent, canActivate: [AuthGuard] },
  { path: 'admin/add-student', component: RegisterStudentComponent, canActivate: [AuthGuard] },
 
  { path: 'admin/class-schedules', component: AdminClassScheduleComponent, canActivate: [AuthGuard] },
  { path: 'admin/placement-drive', component: PlacementDriveCreateComponent, canActivate: [AuthGuard] },

  { path: 'admin/view-drive', component: AdminViewDriveComponent, canActivate: [AuthGuard] },

  { path: 'admin/fee-detail', component:StudentFeeRecordComponent, canActivate: [AuthGuard] },
  { path: 'admin/exam-schedules', component:AdminExamScheduleComponent, canActivate: [AuthGuard] },

  { path: 'admin/user-management', component:UserManagementComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
