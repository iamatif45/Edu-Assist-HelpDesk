using System;
using System.Collections.Generic;

namespace Edu_Assist.Server.Models;

public partial class Activity
{
    public int ActivityId { get; set; }

    public string ActivityType { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string Organizer { get; set; } = null!;

    public DateOnly ActivityDate { get; set; }

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public string Location { get; set; } = null!;
}
