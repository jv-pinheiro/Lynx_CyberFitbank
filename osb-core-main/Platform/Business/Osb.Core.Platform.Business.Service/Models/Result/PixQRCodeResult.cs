using System.Text.Json.Serialization;

namespace Osb.Core.Platform.Business.Service.Models.Result
{
    public class PixQRCodeResult
    {
        public string QRCodeBase64 { get; set; }
        public string HashCode { get; set; }
    }
}