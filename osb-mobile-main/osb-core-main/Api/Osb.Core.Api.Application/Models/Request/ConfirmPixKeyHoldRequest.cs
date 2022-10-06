using Osb.Core.Platform.Common.Entity.Enums;

namespace Osb.Core.Api.Application.Models.Request
{
    public class ConfirmPixKeyHoldRequest : BaseRequest
    {
        public string PixKey { get; set; }
        public PixKeyType? PixKeyType { get; set; }
        public string TaxId { get; set; }
        public string ConfirmationCode { get; set; }
    }
}