using System.Text.Json.Serialization;

namespace Osb.Core.Platform.Integration.Entity.FitBank.Models.Response
{
    public class ExternalFindInfosPixKeyResponse : BaseResponse
    {
        [JsonPropertyName("Infos")]
        public FindInfosPixKeyResponse Data { get; set; }
    }
}