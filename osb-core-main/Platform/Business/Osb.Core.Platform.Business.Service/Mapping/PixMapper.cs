using Osb.Core.Platform.Business.Entity.Models;
using Osb.Core.Platform.Business.Service.Models.Result;
using Osb.Core.Platform.Business.Service.Models.Request;
using IntegrationRequest = Osb.Core.Platform.Integration.Entity.FitBank.Models.Request;
using IntegrationResponse = Osb.Core.Platform.Integration.Entity.FitBank.Models.Response;
using System.Collections.Generic;
using System.Linq;
using System;
using Osb.Core.Platform.Common.Entity.Enums;
using System.Text;
using Osb.Core.Platform.Common.Util;

namespace Osb.Core.Platform.Business.Service.Mapping
{
    public class PixMapper
    {
        public IntegrationRequest.ConfirmPixKeyHoldRequest Map(ConfirmPixKeyHoldRequest request, Account account)
        {
            return new IntegrationRequest.ConfirmPixKeyHoldRequest
            {
                AccountId = request.AccountId,
                PixKey = request.PixKey,
                TaxId = account.TaxId,
                PixKeyType = request.PixKeyType,
                ConfirmationCode = request.ConfirmationCode,
                UserId = request.UserId
            };
        }

        public IntegrationRequest.CreatePixKeyRequest Map(CreatePixKeyRequest request)
        {
            return new IntegrationRequest.CreatePixKeyRequest
            {
                AccountId = request.AccountId,
                PixKey = request.PixKey,
                PixKeyType = request.PixKeyType,
                TaxId = request.TaxId,
                Bank = request.SPBBank,
                BankBranch = request.SPBBankBranch,
                BankAccount = request.SPBBankAccount,
                BankAccountDigit = request.SPBBankAccountDigit,
                UserId = request.UserId
            };
        }

        public IntegrationRequest.ResendPixKeyTokenRequest Map(ResendPixKeyTokenRequest request)
        {
            return new IntegrationRequest.ResendPixKeyTokenRequest
            {
                AccountId = request.AccountId,
                UserId = request.UserId,
                PixKey = request.PixKey,
                TaxId = request.TaxId,
                PixKeyType = request.PixKeyType
            };
        }

        public CreatePixKeyResult Map(IntegrationResponse.CreatePixKeyResponse response)
        {
            return new CreatePixKeyResult
            {
                Key = response.Key
            };
        }

        public IntegrationRequest.CancelPixKeyRequest Map(CancelPixKeyRequest request)
        {
            return new IntegrationRequest.CancelPixKeyRequest
            {
                AccountId = request.AccountId,
                PixKey = request.PixKey,
                PixKeyType = request.PixKeyType,
                TaxId = request.TaxId,
                Bank = request.SPBBank,
                BankBranch = request.SPBBankBranch,
                BankAccount = request.SPBBankAccount,
                BankAccountDigit = request.SPBBankAccountDigit,
                UserId = request.UserId
            };
        }

        public CancelPixKeyResult Map(IntegrationResponse.CancelPixKeyResponse response)
        {
            return new CancelPixKeyResult
            {
                Message = response.Message,
                Status = response.Status
            };
        }

        public ResendPixKeyTokenResult Map(IntegrationResponse.ResendPixKeyTokenResponse response)
        {
            return new ResendPixKeyTokenResult
            {
                Message = response.Message,
                Status = response.Status
            };
        }

        public ConfirmPixKeyHoldResult Map(IntegrationResponse.ConfirmPixKeyHoldResponse response)
        {
            return new ConfirmPixKeyHoldResult
            {
                Message = response.Message,
                Status = response.Status
            };
        }

        public IntegrationRequest.RefundPixInRequest Map(RefundPixIn refundPixIn, Account account, IEnumerable<OperationTag> operationTags)
        {
            return new IntegrationRequest.RefundPixInRequest
            {
                AccountId = account.AccountId,
                Bank = account.SPBBank,
                BankBranch = account.SPBBankBranch,
                BankAccount = account.SPBBankAccount,
                BankAccountDigit = account.SPBBankAccountDigit,
                TaxId = account.TaxId,
                ToTaxId = refundPixIn.ToTaxId,
                ToName = refundPixIn.ToName,
                ToBank = refundPixIn.ToBank,
                ToBankBranch = refundPixIn.ToBankBranch,
                ToBankAccount = refundPixIn.ToBankAccount,
                ToBankAccountDigit = refundPixIn.ToBankAccountDigit,
                RefundValue = refundPixIn.RefundValue,
                CustomerMessage = refundPixIn.CustomerMessage,
                Identifier = refundPixIn.Identifier,
                DocumentNumber = refundPixIn.DocumentNumber,
                Tags = operationTags.Select((OperationTag) => OperationTag.Tag).ToList(),
                UserId = refundPixIn.CreationUserId
            };
        }

        public IntegrationRequest.FindInfosPixKeyRequest Map(FindInfosPixKeyRequest request)
        {
            return new IntegrationRequest.FindInfosPixKeyRequest
            {
                AccountId = request.AccountId,
                PixKey = request.PixKey,
                TaxNumber = request.TaxNumber,
                UserId = request.UserId
            };
        }

        public FindInfosPixKeyResult Map(IntegrationResponse.FindInfosPixKeyResponse response)
        {
            return new FindInfosPixKeyResult
            {
                PayeeName = response.PayeeName,
                PayeeBank = response.PayeeBank,
                PayeeBankBranch = response.PayeeBankBranch,
                PayeeBankAccount = response.PayeeBankAccount,
                PayeeBankAccountDigit = response.PayeeBankAccountDigit,
                PayeeAccountType = Enum.Parse<AccountType>(response.PayeeAccountType),
                PixKeyType = Enum.Parse<PixKeyType>(response.PixKeyType),
                PixKeyValue = response.PixKeyValue,
                PayeeTaxNumber = response.PayeeTaxNumber
            };
        }

        public IntegrationRequest.FindPixKeyListRequest Map(FindPixKeyListRequest request)
        {
            return new IntegrationRequest.FindPixKeyListRequest
            {
                AccountId = request.AccountId,
                TaxId = request.TaxId,
                Bank = request.Bank,
                BankBranch = request.BankBranch,
                BankAccount = request.BankAccount,
                BankAccountDigit = request.BankAccountDigit,
                UserId = request.UserId
            };
        }

        public FindPixKeyListResult Map(IntegrationResponse.FindPixKeyListResponse response)
        {
            return new FindPixKeyListResult
            {
                PixKeyList = response.PixKeys.Select(x => new PixKey
                {
                    PixKeyValue = x.PixKeyValue,
                    PixKeyType = (PixKeyType)x.PixKeyType,
                    Status = Enum.Parse<PixKeyStatus>(x.Status),
                    Bank = x.Bank,
                    BankBranch = x.BankBranch,
                    BankAccount = x.BankAccount,
                    BankAccountDigit = x.BankAccountDigit
                })
            };
        }

        public IntegrationRequest.GeneratePixOutRequest Map(PixOut pixOut, Account account, IEnumerable<OperationTag> operationTags)
        {
            return new IntegrationRequest.GeneratePixOutRequest
            {
                AccountId = pixOut.AccountId,
                Bank = account.SPBBank,
                BankBranch = account.SPBBankBranch,
                BankAccount = account.SPBBankAccount,
                BankAccountDigit = account.SPBBankAccountDigit,
                TaxId = account.TaxId,
                ToName = pixOut.ToName,
                ToTaxId = pixOut.ToTaxId,
                ToBank = pixOut.ToBank,
                ToBankBranch = pixOut.ToBankBranch,
                ToBankAccount = pixOut.ToBankAccount,
                ToBankAccountDigit = pixOut.ToBankAccountDigit,
                AccountType = pixOut.AccountType,
                Identifier = pixOut.Identifier,
                Value = pixOut.Value,
                PaymentDate = pixOut.PaymentDate,
                Tags = operationTags.Select((OperationTag) => OperationTag.Tag).ToList(),
                UserId = pixOut.CreationUserId
            };
        }

        public GeneratePixOutResult Map(IntegrationResponse.GeneratePixOutResponse response)
        {
            return new GeneratePixOutResult
            {
                Message = response.Message
            };
        }
        public IntegrationRequest.GenerateStaticPixQRCodeRequest Map(GenerateStaticPixQRCodeRequest request, Account account)
        {
            return new IntegrationRequest.GenerateStaticPixQRCodeRequest
            {
                AccountId = account.AccountId,
                PrincipalValue = request.PrincipalValue,
                PixKey = request.PixKey,
                Address = request.Address,
                AdditionalData = request.AdditionalData,
                PixTransactionPurpose = request.PixTransactionPurpose,
                TaxNumber = account.TaxId,
                Bank = account.SPBBank,
                BankBranch = account.SPBBankBranch,
                BankAccount = account.SPBBankAccount,
                BankAccountDigit = account.SPBBankAccountDigit,
            };
        }

        public IntegrationRequest.GetPixQRCodeRequest Map(long externalIdentifier, long accountId, string taxId)
        {
            return new IntegrationRequest.GetPixQRCodeRequest
            {
                AccountId = accountId,
                TaxId = taxId,
                ExternalIdentifier = externalIdentifier
            };
        }
        public IntegrationRequest.GenerateDynamicPixQrCodeRequest Map(GenerateDynamicPixQrCodeRequest request, Account account)
        {
            return new IntegrationRequest.GenerateDynamicPixQrCodeRequest
            {
                AccountId = account.AccountId,
                PixKey = request.PixKey,
                TaxId = request.TaxId,
                PayerTaxId = request.PayerTaxId,
                PayerName = request.PayerName,
                Value = request.Value,
                ExpirationDate = DateTime.Now.AddDays(1),
                Bank = account.Bank,
                BankBranch = account.BankBranch,
                BankAccount = account.BankAccount,
                BankAccountDigit = account.BankAccountDigit,
                Address = request.Address,
                ChangeType = request.ChangeType
            };
        }

        public GetPixQRCodeRequest Map(long externalIdentifier, string taxId)
        {
            return new GetPixQRCodeRequest
            {
                ExternalIdentifier = externalIdentifier,
                TaxId = taxId
            };
        }
        public PixQRCodeResult Map(StaticPixQRCode staticPixQRCode)
        {
            return new PixQRCodeResult
            {
                QRCodeBase64 = staticPixQRCode.QRCode,
                HashCode = staticPixQRCode.HashCode
            };
        }

        public PixQRCodeResult Map(PixQRCode pixQRCode)
        {
            return new PixQRCodeResult
            {
                QRCodeBase64 = pixQRCode.QRCode,
                HashCode = pixQRCode.HashCode
            };
        }

        public PixQRCode Map(IntegrationResponse.GetPixQRCodeResponse getPixQRCodeResponse)
        {
            return new PixQRCode
            {
                QRCode = getPixQRCodeResponse.PixQRCode.QRCodeBase64,
                HashCode = getPixQRCodeResponse.PixQRCode.HashCode
            };
        }

        public IntegrationRequest.FindInfoPixQRCodeRequest Map(FindInfoPixQRCodeRequest request)
        {
            return new IntegrationRequest.FindInfoPixQRCodeRequest
            {
                AccountId = request.AccountId,
                UserId = request.UserId,
                TaxId = request.TaxId,
                Hash = request.Hash
            };
        }

        public FindInfoPixQRCodeResult Map(IntegrationResponse.FindInfoPixQRCodeResponse response)
        {
            return new FindInfoPixQRCodeResult
            {
                SearchProtocol = response.SearchProtocol,
                Hash = response.Infos.Hash,
                ReceiverBank = response.Infos.ReceiverBank,
                ReceiverBankBranch = response.Infos.ReceiverBankBranch,
                ReceiverBankAccount = response.Infos.ReceiverBankAccount,
                ReceiverBankAccountDigit = response.Infos.ReceiverBankAccountDigit,
                ReceiverAccountType = response.Infos.ReceiverAccountType,
                Type = response.Infos.Type,
                Status = response.Infos.Status,
                PixKeyValue = response.Infos.PixKeyValue,
                ExternalIdentifier = response.Infos.ExternalIdentifier,
                ReceiverName = response.Infos.ReceiverName,
                ReceiverTaxNumber = response.Infos.ReceiverTaxNumber,
                Description = response.Infos.Description,
                PayerName = response.Infos.PayerName,
                PayerTaxNumber = response.Infos.PayerTaxNumber,
                ZipCode = response.Infos.ZipCode,
                City = response.Infos.City,
                OriginalValue = response.Infos.OriginalValue,
                ExpirationDate = response.Infos.ExpirationDate,
                OriginalCreationDate = response.Infos.OriginalCreationDate,
                Url = response.Infos.Url,
                Reusable = response.Infos.Reusable,
                UF = response.Infos.UF,
                RebateValue = response.Infos.RebateValue,
                DiscountValue = response.Infos.DiscountValue,
                InterestValue = response.Infos.InterestValue,
                FinalValue = response.Infos.FinalValue,
                FineValue = response.Infos.FineValue,
                DueDate = response.Infos.DueDate,
                DaysAfterDueDate = response.Infos.DaysAfterDueDate,
                PaymentDate = response.Infos.PaymentDate,
                CategoryCode = response.Infos.CategoryCode,
                AdditionalData = response.Infos.AdditionalData,
                PayerRequest = response.Infos.PayerRequest,
                ExpirationQrCode = response.Infos.ExpirationQrCode,
                ReceiverTradingName = response.Infos.ReceiverTradingName,
                ReceiverPublicPlace = response.Infos.ReceiverPublicPlace,
                IspbPss = response.Infos.IspbPss,
                ChangeType = response.Infos.ChangeType,
                WithdrawTransactionValue = response.Infos.WithdrawTransactionValue,
                TransactionChangeType = response.Infos.TransactionChangeType,
                WithdrawIspbPss = response.Infos.WithdrawIspbPss,
                WithdrawAgentModality = response.Infos.WithdrawAgentModality,
                PurchaseWithChangeValue = response.Infos.PurchaseWithChangeValue,
                PurchaseWithChangeTransactionChangeType = response.Infos.PurchaseWithChangeTransactionChangeType,
                PurchaseWithChangeIspbPss = response.Infos.PurchaseWithChangeIspbPss,
                PurchaseWithChangeAgentModality = response.Infos.PurchaseWithChangeAgentModality
            };
        }
    }
}