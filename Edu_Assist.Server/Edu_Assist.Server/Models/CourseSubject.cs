using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Edu_Assist.Server.Models;

public partial class CourseSubject
{
    public int Id { get; set; }

    public int CourseId { get; set; }

    public string SubjectName { get; set; } = null!;
    [JsonIgnore]
    public virtual Course? Course { get; set; }
    [JsonIgnore]
    public virtual Subject SubjectNameNavigation { get; set; } 
}
