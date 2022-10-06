using Osb.Core.Platform.Common.Entity.Enums;

namespace Osb.Core.Api.Application.Models.Request
{
    public class FindInfosPixKeyRequest : BaseRequest
    {
        public string PixKey { get; set; }
        public string TaxNumber { get; set; }
        public PixKeyType PixKeyType { get; set; }
    }
}