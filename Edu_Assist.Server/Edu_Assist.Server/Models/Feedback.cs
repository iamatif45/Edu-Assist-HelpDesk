using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Edu_Assist.Server.Models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public int StudentId { get; set; }

    public string FeedbackText { get; set; } = null!;

    public int? Rating { get; set; }

    public DateTime FeedbackDate { get; set; }

    public DateTime Created { get; set; }

    [JsonIgnore]
    public virtual StudentProfile? Student { get; set; }
}
