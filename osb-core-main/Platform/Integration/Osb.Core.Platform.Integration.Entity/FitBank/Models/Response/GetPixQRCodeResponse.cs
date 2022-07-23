using System.Text.Json.Serialization;

namespace Osb.Core.Platform.Integration.Entity.FitBank.Models.Response
{
    public class GetPixQRCodeResponse : BaseResponse
    {
        [JsonPropertyName("GetPixQRCodeByIdInfo")]
        public PixQRCode PixQRCode { get; set; }
    }
}