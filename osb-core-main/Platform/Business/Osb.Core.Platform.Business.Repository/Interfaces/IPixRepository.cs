using Osb.Core.Platform.Common.Entity;
using System.Collections.Generic;
using Osb.Core.Platform.Business.Entity;
using Osb.Core.Platform.Business.Entity.Models;
using Osb.Core.Platform.Common.Entity.Enums;

namespace Osb.Core.Platform.Business.Repository.Interfaces
{
    public interface IPixRepository
    {
        void Save(PixOut pixOut, TransactionScope transactionScope = null);
        void Update(PixOut pixOut);
        IEnumerable<PixOut> GetByStatus(PixOutStatus pixOutStatus);
        void Save(RefundPixIn refundPixIn, TransactionScope transactionScope = null);
        void Update(RefundPixIn refundPixIn);
        IEnumerable<RefundPixIn> GetByStatus(RefundPixInStatus status);
        StaticPixQRCode SaveStaticPixQRCode(long documentNumber, string qrCode, string hashCode, PixKeyType pixKeyType, long userId, long accountId, TransactionScope transactionScope = null);
        StaticPixQRCode GetStaticPixQRCode(PixKeyType pixKeyType, long accountId, long userId);
    }

}