using System.Collections.Generic;
using Osb.Core.Infrastructure.Data.Repository.Interfaces;
using Osb.Core.Platform.Business.Entity.Models;
using Osb.Core.Platform.Business.Repository.Interfaces;
using Osb.Core.Platform.Common.Entity;
using Osb.Core.Platform.Common.Entity.Enums;

namespace Osb.Core.Platform.Business.Repository
{
    public class PixRepository : IPixRepository
    {
        private readonly IDbContext<RefundPixIn> _refundPixInContext;
        private readonly IDbContext<PixOut> _context;
        private readonly IDbContext<StaticPixQRCode> _staticPixQRCodeContext;
        private readonly IDbContext<DynamicPixQrCode> _dynamicPixQrCodecontext;
        private readonly IDbContext<PixQRCode> _pixQRCodeContext;

        public PixRepository(IDbContext<StaticPixQRCode> StaticPixQRCodeContext, IDbContext<DynamicPixQrCode> dynamicPixQRCodeContext, IDbContext<PixQRCode> pixQRCodeContext, IDbContext<RefundPixIn> refundPixInContext, IDbContext<PixOut> context)
        {
            this._refundPixInContext = refundPixInContext;
            this._context = context;
            this._staticPixQRCodeContext = StaticPixQRCodeContext;
            this._dynamicPixQrCodecontext = dynamicPixQRCodeContext;
            this._pixQRCodeContext = pixQRCodeContext;
        }

        public void Save(PixOut pixOut, TransactionScope transactionScope = null)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramAccountId"] = pixOut.AccountId,
                ["paramOperationId"] = pixOut.OperationId,
                ["paramToName"] = pixOut.ToName,
                ["paramToTaxId"] = pixOut.ToTaxId,
                ["paramToBank"] = pixOut.ToBank,
                ["paramToBankBranch"] = pixOut.ToBankBranch,
                ["paramToBankAccount"] = pixOut.ToBankAccount,
                ["paramToBankAccountDigit"] = pixOut.ToBankAccountDigit,
                ["paramValue"] = pixOut.Value,
                ["paramStatus"] = pixOut.Status,
                ["paramPaymentDate"] = pixOut.PaymentDate,
                ["paramIdentifier"] = pixOut.Identifier,
                ["paramCustomerMessage"] = pixOut.CustomerMessage,
                ["paramPixKey"] = pixOut.PixKey,
                ["paramPixKeyType"] = pixOut.PixKeyType,
                ["paramAccountType"] = pixOut.AccountType,
                ["paramDescription"] = pixOut.Description,
                ["paramUserId"] = pixOut.CreationUserId
            };

            _context.ExecuteWithNoResult("InsertPixOut", parameters, transactionScope);
        }

        public void Update(PixOut pixOut)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramId"] = pixOut.PixOutId,
                ["paramExternalIdentifier"] = pixOut.ExternalIdentifier,
                ["paramAttempts"] = pixOut.Attempts,
                ["paramStatus"] = pixOut.Status
            };

            _context.ExecuteWithNoResult("UpdatePixOut", parameters);
        }

        public IEnumerable<PixOut> GetByStatus(PixOutStatus pixOutStatus)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramStatus"] = pixOutStatus
            };

            return _context.ExecuteWithMultipleResults("GetPixOutByStatus", parameters);
        }

        public void Save(RefundPixIn refundPixIn, TransactionScope transactionScope = null)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramAccountId"] = refundPixIn.AccountId,
                ["paramOperationId"] = refundPixIn.OperationId,
                ["paramToTaxId"] = refundPixIn.ToTaxId,
                ["paramToName"] = refundPixIn.ToName,
                ["paramToBank"] = refundPixIn.ToBank,
                ["paramToBankBranch"] = refundPixIn.ToBankBranch,
                ["paramToBankAccount"] = refundPixIn.ToBankAccount,
                ["paramToBankAccountDigit"] = refundPixIn.ToBankAccountDigit,
                ["paramRefundValue"] = refundPixIn.RefundValue,
                ["paramCustomerMessage"] = refundPixIn.CustomerMessage,
                ["paramDocumentNumber"] = refundPixIn.DocumentNumber,
                ["paramIdentifier"] = refundPixIn.Identifier,
                ["paramStatus"] = refundPixIn.Status,
                ["paramUserId"] = refundPixIn.CreationUserId
            };

            _refundPixInContext.ExecuteWithNoResult("InsertRefundPixIn", parameters, transactionScope);
        }

        public void Update(RefundPixIn refundPixIn)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramRefundPixInId"] = refundPixIn.RefundPixInId,
                ["paramStatus"] = refundPixIn.Status,
                ["paramAttempts"] = refundPixIn.Attempts,
                ["paramExternalIdentifier"] = refundPixIn.ExternalIdentifier,
                ["paramUpdateUserId"] = refundPixIn.UpdateUserId
            };

            _refundPixInContext.ExecuteWithNoResult("UpdateRefundPixIn", parameters);
        }

        public IEnumerable<RefundPixIn> GetByStatus(RefundPixInStatus status)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramStatus"] = status
            };

            return _refundPixInContext.ExecuteWithMultipleResults("GetRefundPixInByStatus", parameters);
        }

        public StaticPixQRCode SaveStaticPixQRCode(long externalIdentifier, string qrCode, string hashCode, PixKeyType pixKeyType, long userId, long accountId, TransactionScope transactionScope = null)
        {

            var parameters = new Dictionary<string, dynamic>
            {
                ["paramExternalIdentifier"] = externalIdentifier,
                ["paramQRCode"] = qrCode,
                ["paramHashCode"] = hashCode,
                ["paramPixKeyType"] = pixKeyType,
                ["paramUserId"] = userId,
                ["paramAccountId"] = accountId
            };

            return _staticPixQRCodeContext.ExecuteWithSingleResult("insertstaticpixqrcode", parameters, transactionScope);
        }

        public StaticPixQRCode GetStaticPixQRCode(PixKeyType pixKeyType, long userId, long accountId)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramPixKeyType"] = pixKeyType,
                ["paramUserId"] = userId,
                ["paramAccountId"] = accountId
            };

            StaticPixQRCode staticPixQRCode = _staticPixQRCodeContext.ExecuteWithSingleResult("GetStaticPixQRCode", parameters);

            return staticPixQRCode;
        }

    }
}