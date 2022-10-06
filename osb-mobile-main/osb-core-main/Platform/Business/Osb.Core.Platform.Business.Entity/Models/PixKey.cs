using Osb.Core.Platform.Common.Entity.Enums;

namespace Osb.Core.Platform.Business.Entity.Models
{
    public class PixKey
    {
        public string PixKeyValue { get; set; }

        public PixKeyType PixKeyType { get; set; }

        public PixKeyStatus Status { get; set; }

        public string Bank { get; set; }

        public string BankBranch { get; set; }

        public string BankAccount { get; set; }

        public string BankAccountDigit { get; set; }
    }
}