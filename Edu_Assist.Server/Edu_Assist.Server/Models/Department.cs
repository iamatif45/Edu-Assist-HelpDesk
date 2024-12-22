using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Edu_Assist.Server.Models;

public partial class Department
{
    public int DepartmentId { get; set; }

    public string DepartmentName { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<StaffProfile> StaffProfiles { get; set; } = new List<StaffProfile>();
    [JsonIgnore]
    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
