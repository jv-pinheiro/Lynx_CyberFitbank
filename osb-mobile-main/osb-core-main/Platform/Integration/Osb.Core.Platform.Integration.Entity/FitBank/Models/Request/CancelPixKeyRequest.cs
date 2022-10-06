using Osb.Core.Platform.Integration.Entity.Models.Request.Base;
using Osb.Core.Platform.Common.Entity.Enums;

namespace Osb.Core.Platform.Integration.Entity.FitBank.Models.Request
{

public class CancelPixKeyRequest : BaseRequest
    {
        public new string Method { get => "CancelPixKey"; }
        public string PixKey { get; set; }
        public PixKeyType? PixKeyType { get; set; }
        public string TaxId { get; set; }
        public string Bank { get; set; }
        public string BankBranch { get; set; }
        public string BankAccount { get; set; }
        public string BankAccountDigit { get; set; }
    }
}