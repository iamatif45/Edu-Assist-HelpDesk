using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Edu_Assist.Server.Models;

public partial class StudentProfile
{
    public int StudentProfileId { get; set; }

    public int UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? Gender { get; set; }

    public DateOnly? Dob { get; set; }

    public string Contact { get; set; } = null!;

    public string? StudentAddress { get; set; }

    public int CourseId { get; set; }

    public int AcademicYear { get; set; }

    public byte[]? ProfilePic { get; set; }

    [JsonIgnore]
    public virtual Course? Course { get; set; }

    [JsonIgnore]
    public virtual ICollection<FeePaymentRecord> FeePaymentRecords { get; set; } = new List<FeePaymentRecord>();
    [JsonIgnore]
    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
    [JsonIgnore]
    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    [JsonIgnore]
    public virtual User User { get; set; }
}
