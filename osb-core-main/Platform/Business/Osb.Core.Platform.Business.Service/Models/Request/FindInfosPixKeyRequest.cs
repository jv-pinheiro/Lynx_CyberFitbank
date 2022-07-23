namespace Osb.Core.Platform.Business.Service.Models.Request
{
    public class FindInfosPixKeyRequest : BaseRequest
    {
        public string PixKey { get; set; }
        public string TaxNumber { get; set; }
    }
}