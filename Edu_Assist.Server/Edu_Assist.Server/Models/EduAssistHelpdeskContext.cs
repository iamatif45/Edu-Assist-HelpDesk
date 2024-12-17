using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Edu_Assist.Server.Models;

public partial class EduAssistHelpdeskContext : DbContext
{
    public EduAssistHelpdeskContext()
    {
    }

    public EduAssistHelpdeskContext(DbContextOptions<EduAssistHelpdeskContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Activity> Activities { get; set; }

    public virtual DbSet<ClassSchedule> ClassSchedules { get; set; }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<CourseSubject> CourseSubjects { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<ExamSchedule> ExamSchedules { get; set; }

    public virtual DbSet<FeePaymentRecord> FeePaymentRecords { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Logistic> Logistics { get; set; }

    public virtual DbSet<PlacementDrife> PlacementDrives { get; set; }

    public virtual DbSet<Professor> Professors { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<StaffProfile> StaffProfiles { get; set; }

    public virtual DbSet<StudentProfile> StudentProfiles { get; set; }

    public virtual DbSet<Subject> Subjects { get; set; }

    public virtual DbSet<Ticket> Tickets { get; set; }

    public virtual DbSet<TicketLog> TicketLogs { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-5RJDN9Q;Database=EduAssistHelpdesk;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Activity>(entity =>
        {
            entity.HasKey(e => e.ActivityId).HasName("PK__Activiti__45F4A7F1F7C657B3");

            entity.HasIndex(e => new { e.ActivityType, e.ActivityDate, e.StartTime, e.Location }, "UniqueActivitySchedule").IsUnique();

            entity.Property(e => e.ActivityId).HasColumnName("ActivityID");
            entity.Property(e => e.ActivityType).HasMaxLength(50);
            entity.Property(e => e.Location).HasMaxLength(255);
            entity.Property(e => e.Organizer).HasMaxLength(255);
            entity.Property(e => e.Title).HasMaxLength(255);
        });

        modelBuilder.Entity<ClassSchedule>(entity =>
        {
            entity.HasKey(e => e.ScheduleId).HasName("PK__ClassSch__9C8A5B69869E95D2");

            entity.ToTable("ClassSchedule");

            entity.HasIndex(e => new { e.CourseId, e.DayOfWeek, e.StartTime, e.EndTime }, "UniqueCourseSchedule").IsUnique();

            entity.Property(e => e.ScheduleId).HasColumnName("ScheduleID");
            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.DayOfWeek).HasMaxLength(9);
            entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

            entity.HasOne(d => d.Course).WithMany(p => p.ClassSchedules)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK_ClassSchedule_Course");

            entity.HasOne(d => d.Subject).WithMany(p => p.ClassSchedules)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK_ClassSchedule_Subject");
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourseId).HasName("PK__Course__C92D7187BF8CC729");

            entity.ToTable("Course");

            entity.HasIndex(e => new { e.CourseName, e.Branch }, "UQ_Course").IsUnique();

            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.Branch).HasMaxLength(50);
            entity.Property(e => e.CourseName).HasMaxLength(100);
            entity.Property(e => e.Hod).HasColumnName("HOD");

            entity.HasOne(d => d.HodNavigation).WithMany(p => p.Courses)
                .HasForeignKey(d => d.Hod)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Course_HOD");
        });

        modelBuilder.Entity<CourseSubject>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CourseSu__3214EC27033389FC");

            entity.ToTable("CourseSubject");

            entity.HasIndex(e => new { e.CourseId, e.SubjectName }, "UQ_CourseSubject").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.SubjectName).HasMaxLength(100);

            entity.HasOne(d => d.Course).WithMany(p => p.CourseSubjects)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK_CourseSubject_Course");

            entity.HasOne(d => d.SubjectNameNavigation).WithMany(p => p.CourseSubjects)
                .HasPrincipalKey(p => p.SubjectName)
                .HasForeignKey(d => d.SubjectName)
                .HasConstraintName("FK_CourseSubject_Subject");
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.DepartmentId).HasName("PK__Departme__B2079BCDDFA98F44");

            entity.ToTable("Department");

            entity.HasIndex(e => e.DepartmentName, "UQ__Departme__D949CC348278F5AE").IsUnique();

            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.DepartmentName).HasMaxLength(100);
        });

        modelBuilder.Entity<ExamSchedule>(entity =>
        {
            entity.HasKey(e => e.ExamId).HasName("PK__ExamSche__297521A71A42B8D4");

            entity.ToTable("ExamSchedule");

            entity.HasIndex(e => new { e.CourseId, e.SubjectId, e.ExamDate, e.StartTime }, "UniqueExamSchedule").IsUnique();

            entity.Property(e => e.ExamId).HasColumnName("ExamID");
            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.Room).HasMaxLength(50);
            entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

            entity.HasOne(d => d.Course).WithMany(p => p.ExamSchedules)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK_ExamSchedule_Course");

            entity.HasOne(d => d.Subject).WithMany(p => p.ExamSchedules)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK_ExamSchedule_Subject");
        });

        modelBuilder.Entity<FeePaymentRecord>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__FeePayme__9B556A58CC5F8374");

            entity.ToTable(tb => tb.HasTrigger("trg_SetTotalFee"));

            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");
            entity.Property(e => e.Created)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.StudentId).HasColumnName("StudentID");

            entity.HasOne(d => d.Student).WithMany(p => p.FeePaymentRecords)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_FeePaymentRecords_Student");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__6A4BEDF6F5CD7D47");

            entity.ToTable("Feedback");

            entity.Property(e => e.FeedbackId).HasColumnName("FeedbackID");
            entity.Property(e => e.Created)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.FeedbackDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Rating).HasDefaultValue(1);
            entity.Property(e => e.StudentId).HasColumnName("StudentID");

            entity.HasOne(d => d.Student).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_Feedback_Student");
        });

        modelBuilder.Entity<Logistic>(entity =>
        {
            entity.HasKey(e => e.LogisticsId).HasName("PK__Logistic__15C9057B6ECEA65A");

            entity.Property(e => e.LogisticsId).HasColumnName("LogisticsID");
            entity.Property(e => e.Category).HasMaxLength(100);
        });

        modelBuilder.Entity<PlacementDrife>(entity =>
        {
            entity.HasKey(e => e.DriveId).HasName("PK__Placemen__9610CA389396D327");

            entity.HasIndex(e => new { e.CompanyName, e.JobTitle, e.DriveDate, e.StartTime, e.Location }, "UniqueDrive").IsUnique();

            entity.Property(e => e.DriveId).HasColumnName("DriveID");
            entity.Property(e => e.CompanyName).HasMaxLength(255);
            entity.Property(e => e.JobTitle).HasMaxLength(255);
            entity.Property(e => e.Location).HasMaxLength(255);
            entity.Property(e => e.OrganizedBy).HasMaxLength(255);
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasDefaultValue("Scheduled");
        });

        modelBuilder.Entity<Professor>(entity =>
        {
            entity.HasKey(e => e.ProfessorId).HasName("PK__Professo__900359698955FFD1");

            entity.ToTable("Professor");

            entity.HasIndex(e => e.Email, "UQ__Professo__A9D1053418BDEBCA").IsUnique();

            entity.Property(e => e.ProfessorId).HasColumnName("ProfessorID");
            entity.Property(e => e.Contact).HasMaxLength(10);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Expertise).HasMaxLength(255);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__8AFACE3AD28DE141");

            entity.ToTable("Role");

            entity.HasIndex(e => e.RoleName, "UQ__Role__8A2B61602701BEF5").IsUnique();

            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.RoleName).HasMaxLength(50);
        });

        modelBuilder.Entity<StaffProfile>(entity =>
        {
            entity.HasKey(e => e.StaffProfileId).HasName("PK__StaffPro__0A29819675A94F4C");

            entity.ToTable("StaffProfile");

            entity.HasIndex(e => e.UserId, "UQ__StaffPro__1788CCADB9809290").IsUnique();

            entity.Property(e => e.StaffProfileId).HasColumnName("StaffProfileID");
            entity.Property(e => e.Contact).HasMaxLength(10);
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.Gender).HasMaxLength(10);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Department).WithMany(p => p.StaffProfiles)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StaffProfile_Department");

            entity.HasOne(d => d.User).WithOne(p => p.StaffProfile)
                .HasForeignKey<StaffProfile>(d => d.UserId)
                .HasConstraintName("FK_StaffProfile_User");
        });

        modelBuilder.Entity<StudentProfile>(entity =>
        {
            entity.HasKey(e => e.StudentProfileId).HasName("PK__StudentP__222BD0D07B37214E");

            entity.ToTable("StudentProfile");

            entity.HasIndex(e => e.UserId, "UQ__StudentP__1788CCAD8275C347").IsUnique();

            entity.Property(e => e.StudentProfileId).HasColumnName("StudentProfileID");
            entity.Property(e => e.AcademicYear).HasDefaultValue(1);
            entity.Property(e => e.Contact).HasMaxLength(10);
            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.Gender).HasMaxLength(10);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Course).WithMany(p => p.StudentProfiles)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentProfile_Course");

            entity.HasOne(d => d.User).WithOne(p => p.StudentProfile)
                .HasForeignKey<StudentProfile>(d => d.UserId)
                .HasConstraintName("FK_StudentProfile_User");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasKey(e => e.SubjectId).HasName("PK__Subject__AC1BA38811AF3355");

            entity.ToTable("Subject");

            entity.HasIndex(e => e.SubjectName, "UQ__Subject__4C5A7D55B55DADEC").IsUnique();

            entity.Property(e => e.SubjectId).HasColumnName("SubjectID");
            entity.Property(e => e.SubjectName).HasMaxLength(100);
        });

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(e => e.TicketId).HasName("PK__Tickets__712CC62746D562D2");

            entity.ToTable(tb => tb.HasTrigger("trg_InsertTicketLog"));

            entity.Property(e => e.TicketId).HasColumnName("TicketID");
            entity.Property(e => e.AssignedToStaffId).HasColumnName("AssignedToStaffID");
            entity.Property(e => e.Created)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.CurrentStatus)
                .HasMaxLength(50)
                .HasDefaultValue("Open");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.ResolvedDate).HasColumnType("datetime");
            entity.Property(e => e.StudentId).HasColumnName("StudentID");
            entity.Property(e => e.Title).HasMaxLength(255);
            entity.Property(e => e.Updated)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.AssignedToStaff).WithMany(p => p.Tickets)
                .HasForeignKey(d => d.AssignedToStaffId)
                .HasConstraintName("FK_Tickets_Staff");

            entity.HasOne(d => d.Department).WithMany(p => p.Tickets)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Tickets_Department");

            entity.HasOne(d => d.Student).WithMany(p => p.Tickets)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_Tickets_Student");
        });

        modelBuilder.Entity<TicketLog>(entity =>
        {
            entity.HasKey(e => e.LogId).HasName("PK__TicketLo__5E5499A8115E6840");

            entity.ToTable("TicketLog", tb => tb.HasTrigger("trg_UpdateTickets"));

            entity.Property(e => e.LogId).HasColumnName("LogID");
            entity.Property(e => e.AssignedStaffId).HasColumnName("AssignedStaffID");
            entity.Property(e => e.PreviousStatus).HasMaxLength(50);
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasDefaultValue("Open");
            entity.Property(e => e.TicketId).HasColumnName("TicketID");
            entity.Property(e => e.UpdatedByStaffId).HasColumnName("UpdatedByStaffID");
            entity.Property(e => e.UpdatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.AssignedStaff).WithMany(p => p.TicketLogAssignedStaffs)
                .HasForeignKey(d => d.AssignedStaffId)
                .HasConstraintName("FK_TicketLog_AssignedStaff");

            entity.HasOne(d => d.Ticket).WithMany(p => p.TicketLogs)
                .HasForeignKey(d => d.TicketId)
                .HasConstraintName("FK_TicketLog_Ticket");

            entity.HasOne(d => d.UpdatedByStaff).WithMany(p => p.TicketLogUpdatedByStaffs)
                .HasForeignKey(d => d.UpdatedByStaffId)
                .HasConstraintName("FK_TicketLog_Staff");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__1788CCAC7E783793");

            entity.ToTable("User");

            entity.HasIndex(e => e.Username, "UQ__User__536C85E4AF59483D").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__User__A9D105344455FBF0").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.PasswordHash).HasMaxLength(255);
            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.Username).HasMaxLength(16);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_User_Role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
