using Osb.Core.Platform.Common.Entity.Enums;

namespace Osb.Core.Platform.Business.Service.Models.Request
{
    public class InactivateAndReissueCardRequest : BaseRequest
    {
        public string IdentifierCard { get; set; }
        public string Pin { get; set; }
        public CardReasonCode ReasonCode { get; set; }
        public CardDeliveryAddressRequest CardDeliveryAddress { get; set; }
    }
}