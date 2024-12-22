using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Edu_Assist.Server.Models;

public partial class Course
{
    public int CourseId { get; set; }

    public string CourseName { get; set; } = null!;

    public string Branch { get; set; } = null!;

    public int Hod { get; set; }

    public double? Fee { get; set; }
    [JsonIgnore]
    public virtual ICollection<ClassSchedule> ClassSchedules { get; set; } = new List<ClassSchedule>();
    [JsonIgnore]
    public virtual ICollection<CourseSubject> CourseSubjects { get; set; } = new List<CourseSubject>();
    [JsonIgnore]
    public virtual ICollection<ExamSchedule> ExamSchedules { get; set; } = new List<ExamSchedule>();

    public virtual Professor? HodNavigation { get; set; }
    [JsonIgnore]
    public virtual ICollection<StudentProfile> StudentProfiles { get; set; } = new List<StudentProfile>();
}
