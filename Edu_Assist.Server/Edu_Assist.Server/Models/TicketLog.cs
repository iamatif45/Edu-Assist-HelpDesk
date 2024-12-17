using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Edu_Assist.Server.Models;

public partial class TicketLog
{
    public int LogId { get; set; }

    public int TicketId { get; set; }

    public int? UpdatedByStaffId { get; set; }

    public string? PreviousStatus { get; set; }

    public string Status { get; set; } = null!;

    public string? Comments { get; set; }

    public int? AssignedStaffId { get; set; }

    public DateTime UpdatedDate { get; set; }
    [JsonIgnore]
    public virtual StaffProfile? AssignedStaff { get; set; }
    [JsonIgnore]
    public virtual Ticket? Ticket { get; set; }
    [JsonIgnore]
    public virtual StaffProfile? UpdatedByStaff { get; set; }
}
