using System.Text.Json.Serialization;
using Osb.Core.Platform.Common.Entity.Enums;

namespace Osb.Core.Platform.Business.Service.Models.Request
{
    public class GetPixQRCodeRequest : BaseRequest
    {
        public long ExternalIdentifier { get; set; }
        public string TaxId { get; set; }

        public static GetPixQRCodeRequest Create(long externalIdentifier, string taxId, long accountId)
        {
            return new GetPixQRCodeRequest
            {
                ExternalIdentifier = externalIdentifier,
                TaxId = taxId,
                AccountId = accountId
            };
        }
    }
}