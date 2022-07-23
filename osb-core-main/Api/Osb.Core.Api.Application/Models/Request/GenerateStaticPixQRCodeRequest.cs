using Osb.Core.Platform.Common.Entity.Enums;
using Osb.Core.Platform.Integration.Entity.FitBank.Models;

namespace Osb.Core.Api.Application.Models.Request
{
    public class GenerateStaticPixQRCodeRequest : BaseRequest
    {
        public decimal? PrincipalValue { get; set; }
        public string PixKey { get; set; }
        public PixAddress Address { get; set; }
        public string AdditionalData { get; set; }
        public PixTransactionPurpose? PixTransactionPurpose { get; set; }
        public PixKeyType PixKeyType { get; set; }
    }
}