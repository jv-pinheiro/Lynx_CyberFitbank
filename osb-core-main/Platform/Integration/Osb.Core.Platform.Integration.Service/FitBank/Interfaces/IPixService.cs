using Osb.Core.Platform.Integration.Entity.FitBank.Models.Request;
using Osb.Core.Platform.Integration.Entity.FitBank.Models.Response;

namespace Osb.Core.Platform.Integration.Service.FitBank.Interfaces
{
    public interface IPixService
    {
        CreatePixKeyResponse CreatePixKey(CreatePixKeyRequest createPixKeyRequest);
        ConfirmPixKeyHoldResponse ConfirmPixKeyHold(ConfirmPixKeyHoldRequest confirmPixKeyHoldRequest);
        ResendPixKeyTokenResponse ResendPixKeyToken(ResendPixKeyTokenRequest resendPixKeyTokenRequest);
        CancelPixKeyResponse CancelPixKey(CancelPixKeyRequest cancelPixKeyRequest);
        RefundPixInResponse GenerateRefundPixIn(RefundPixInRequest refundPixInRequest);
        FindInfosPixKeyResponse FindInfosPixKey(FindInfosPixKeyRequest findInfosPixKeyRequest);
        FindPixKeyListResponse FindPixKeyList(FindPixKeyListRequest findPixKeyListRequest);
        GeneratePixOutResponse GeneratePixOut(GeneratePixOutRequest generatePixOutRequest);
        GenerateStaticPixQRCodeResponse GenerateStaticPixQRCode(GenerateStaticPixQRCodeRequest generateStaticPixQRCodeRequest);
        GetPixQRCodeResponse GetPixQRCode(GetPixQRCodeRequest getPixQRCodeRequest);
        GenerateDynamicPixQrCodeResponse GenerateDynamicPixQrCode(GenerateDynamicPixQrCodeRequest generateDynamicPixQrCodeRequest);
        FindInfoPixQRCodeResponse FindInfoPixQRCode(FindInfoPixQRCodeRequest findInfoPixQRCodeRequest);
    }
}