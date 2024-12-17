using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Edu_Assist.Server.Models;

public partial class ExamSchedule
{
    public int ExamId { get; set; }

    public int CourseId { get; set; }

    public int SubjectId { get; set; }

    public DateOnly ExamDate { get; set; }

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public string Room { get; set; } = null!;

    [JsonIgnore]
    public virtual Course? Course { get; set; }
    
    public virtual Subject? Subject { get; set; }
}
