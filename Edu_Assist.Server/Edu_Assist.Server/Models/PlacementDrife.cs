using System;
using System.Collections.Generic;

namespace Edu_Assist.Server.Models;

public partial class PlacementDrife
{
    public int DriveId { get; set; }

    public string CompanyName { get; set; } = null!;

    public string JobTitle { get; set; } = null!;

    public string? EligibilityCriteria { get; set; }

    public DateOnly DriveDate { get; set; }

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public string Location { get; set; } = null!;

    public string OrganizedBy { get; set; } = null!;

    public string Status { get; set; } = null!;
}
