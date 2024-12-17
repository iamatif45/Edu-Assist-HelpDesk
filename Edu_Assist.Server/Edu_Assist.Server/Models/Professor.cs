using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Edu_Assist.Server.Models;

public partial class Professor
{
    public int ProfessorId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Contact { get; set; } = null!;

    public string? Expertise { get; set; }

    [JsonIgnore]
    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}
