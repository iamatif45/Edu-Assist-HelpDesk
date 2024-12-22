using Edu_Assist.Server.Models;

namespace Edu_Assist.Server.Repo
{
    public interface IStudentRepo
    {
        Task<List<StudentProfile>> GetAll();
        Task<StudentProfile> GetStudentbyId(int studentId);
        Task<StudentProfile> GetStudentbyUserId(int userId);
        Task Add(StudentProfile student);
        Task Update(StudentProfile student);
        Task DeleteById(int id);
        Task SaveAsync();
    }
    public interface IStaffRepo
    {
        Task<List<StaffProfile>> GetAll();
        Task<StaffProfile> GetStaffbyId(int Id);

        Task<StaffProfile> GetStaffbyUserId(int Id);

        Task Add(StaffProfile staff);
        Task Update(StaffProfile staff);
        Task DeleteById(int id);

        Task SaveAsync();
    }

    public interface ISubjectRepo
    {
        Task<List<Subject>> GetAll();
        Task<Subject> GetSubjectById(int id);
        Task Add(Subject subject);
        Task Update(Subject subject);
        Task DeleteById(int id);
    }

    public interface ITicketRepo
    {
        Task<List<Ticket>> GetAll();
        Task<Ticket> GetTicketById(int id);
        Task<List<Ticket>> GetTicketByStudentId(int id);
        Task Add(Ticket ticket);
        Task Update(Ticket ticket);
        Task DeleteById(int id);
    }

    public interface ITicketLogRepo
    {
        Task<List<TicketLog>> GetAll();
        Task<TicketLog> GetTicketById(int id);
        Task<List<TicketLog>> GetTicketLogByTicketId(int id);
        Task Add(TicketLog ticketlog);
        Task Update(TicketLog ticketlog);
        Task DeleteById(int id);
    }
    public interface IUserRepo
    {
        Task<List<User>> GetAll();
        Task<User> GetUserByUsername(string username);
        Task Add(User user);
        Task Update(User user);
        Task DeleteByUsername(string username);
        bool VerifyPasswordHash(User user, string password);
        Task UpdatePassword(User user, string oldPassword);
    }
    public interface IActivityRepo
    {
        Task<List<Activity>> GetAll();
        Task<Activity> GetActivityById(int id);
        Task Add(Activity activity);
        Task Update(Activity activity);
        Task DeleteById(int id);
    }

    public interface ICourseRepo
    {
        Task<List<Course>> GetAll();
        Task<Course> GetCourseById(int id);
        Task Add(Course course);
        Task Update(Course course);
        Task DeleteById(int id);
    }
    public interface IProfessorRepo
    {
        Task<List<Professor>> GetAll();
        Task<Professor> GetProfessorById(int id);
        Task Add(Professor professor);
        Task Update(Professor professor);
        Task DeleteById(int id);
    }
    public interface IPlacementRepo
    {
        Task<List<PlacementDrife>> GetAll();
        Task<PlacementDrife> GetPlacementDriveById(int Id);
        Task Add(PlacementDrife drive);
        Task Update(PlacementDrife drive);
        Task DeleteById(int id);
    }
    public interface ICourseSubjectRepo
    {
        Task<List<CourseSubject>> GetAll();
        Task<CourseSubject> GetCourseSubjectById(int id);
        Task Add(CourseSubject courseSubject);
        Task Update(CourseSubject courseSubject);
        Task<List<CourseSubject>> GetSubjectsByCourseId(int Id);
        Task DeleteById(int id);
    }

    public interface IFeedbackRepo
    {
        Task<List<Feedback>> GetAll();
        Task<Feedback> GetFeedbackbyId(int Id);
        Task<List<Feedback>> GetFeedbackbyStudentId(int Id);
        Task Add(Feedback feedback);
        Task Update(Feedback feedback);
        Task DeleteById(int id);
    }

    public interface IFeePaymentRepo
    {
        Task<List<FeePaymentRecord>> GetAll();
        Task<FeePaymentRecord> GetFeePaymentById(int Id);

        Task<List<FeePaymentRecord>> GetFeeRecordbyStudentId(int Id);
        Task Add(FeePaymentRecord feePaymentRecord);
        Task Update(FeePaymentRecord feePaymentRecord);
        Task DeleteById(int id);
    }
    public interface ILogisticsRepo
    {
        Task<List<Logistic>> GetAll();
        Task<Logistic> GetLogisticById(int id);
        Task Add(Logistic logistic);
        Task Update(Logistic logistic);
        Task DeleteById(int id);
    }

    public interface IExamSchedule 
    {
        Task<List<ExamSchedule>> GetAll();
        Task<ExamSchedule> GeExamScheduleById(int id);
        Task<List<ExamSchedule>> GeExamScheduleByCourseId(int id);
        Task Add(ExamSchedule examSchedule);
        Task Update(ExamSchedule examSchedule);
        Task DeleteById(int id);
    }

    public interface IClassSchedule
    {
        Task<List<ClassSchedule>> GetAll();
        Task<List<ClassSchedule>> GetClassScheduleByCourseID(int id);

        Task<ClassSchedule> GetclassSChedulebyId(int id);

        Task Add(ClassSchedule classSchedule);
        Task Update(ClassSchedule classSchedule);
        Task DeleteByClassScheduleId(int id);
    }


}

