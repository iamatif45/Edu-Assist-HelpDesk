using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Edu_Assist.Server.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public int RoleId { get; set; }

    public bool IsActive { get; set; }

    public virtual Role? Role { get; set; }
    [JsonIgnore]
    public virtual StaffProfile? StaffProfile { get; set; }
    [JsonIgnore]
    public virtual StudentProfile? StudentProfile { get; set; }
}
