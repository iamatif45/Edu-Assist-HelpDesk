using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Edu_Assist.Server.Models;

public partial class ClassSchedule
{
    public int ScheduleId { get; set; }

    public int SubjectId { get; set; }

    public int CourseId { get; set; }

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public string DayOfWeek { get; set; } = null!;

    [JsonIgnore]
    public virtual Course? Course { get; set; }
    [JsonIgnore]
    public virtual Subject? Subject { get; set; }
}
