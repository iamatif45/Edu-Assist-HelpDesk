using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Edu_Assist.Server.Models;

public partial class FeePaymentRecord
{
    public int PaymentId { get; set; }

    public int StudentId { get; set; }

    public double? TotalFee { get; set; }

    public double PaidFee { get; set; }

    public double? PendingFee { get; set; }

    public int PaymentYear { get; set; }

    public DateTime Created { get; set; }
    [JsonIgnore]
    public virtual StudentProfile? Student { get; set; } 
}
