using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Edu_Assist.Server.Models;

public partial class StaffProfile
{
    public int StaffProfileId { get; set; }

    public int UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? Gender { get; set; }

    public string Contact { get; set; } = null!;

    public int DepartmentId { get; set; }

    public byte[]? ProfilePic { get; set; }

    [JsonIgnore]
    public virtual Department? Department { get; set; }

    [JsonIgnore]
    public virtual ICollection<TicketLog> TicketLogAssignedStaffs { get; set; } = new List<TicketLog>();
    [JsonIgnore]
    public virtual ICollection<TicketLog> TicketLogUpdatedByStaffs { get; set; } = new List<TicketLog>();
    [JsonIgnore]
    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    [JsonIgnore]
    public virtual User User { get; set; }
}
