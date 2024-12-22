using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Edu_Assist.Server.Models;

public partial class Ticket
{
    public int TicketId { get; set; }

    public int StudentId { get; set; }

    public int DepartmentId { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string CurrentStatus { get; set; } = null!;

    public int? AssignedToStaffId { get; set; }

    public DateTime? ResolvedDate { get; set; }

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    [JsonIgnore]
    public virtual StaffProfile? AssignedToStaff { get; set; }
  
    public virtual Department? Department { get; set; } 
    [JsonIgnore]
    public virtual StudentProfile? Student { get; set; }
    [JsonIgnore]
    public virtual ICollection<TicketLog> TicketLogs { get; set; } = new List<TicketLog>();
}
