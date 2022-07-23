using Osb.Core.Platform.Integration.Entity.Models.Request.Base;

namespace Osb.Core.Platform.Integration.Entity.FitBank.Models.Request
{
    public class FindInfosPixKeyRequest : BaseRequest
    {
        public new string Method { get => "GetInfosPixKey"; }
        public string PixKey { get; set; }
        public string TaxNumber { get; set; }
    }
}