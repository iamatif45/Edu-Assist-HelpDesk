namespace Edu_Assist.Server.DTO
{
    public class ExamScheduleDTO
    {
        public int ExamId { get; set; }
        public int CourseId { get; set; }
        public string SubjectName { get; set; } = null!;
        public DateOnly ExamDate { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public string Room { get; set; } = null!;
    }
}
