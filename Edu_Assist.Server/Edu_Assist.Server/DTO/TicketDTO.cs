namespace Edu_Assist.Server.DTO
{
    public class TicketDTO
    {
        public int TicketId { get; set; }
        public int StudentId { get; set; }
        public string DepartmentName { get; set; } = string.Empty;  // Department name instead of ID
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string CurrentStatus { get; set; } = string.Empty;
        public int? AssignedToStaffId { get; set; }
        public DateTime? ResolvedDate { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}
