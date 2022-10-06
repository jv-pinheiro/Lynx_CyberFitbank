using System.Collections.Generic;
using Osb.Core.Platform.Business.Entity.Models;
using Osb.Core.Platform.Common.Entity;
using Osb.Core.Platform.Common.Entity.Enums;

namespace Osb.Core.Platform.Business.Repository.Interfaces
{
    public interface IFavoredRepository
    {
        void Save(Favored favored, TransactionScope transactionScope = null);
        IEnumerable<Favored> GetByAccountId(long accountId);
        IEnumerable<Favored> GetFavored(long accountId, string taxId, string bank, string bankBranch, string bankAccount, string bankAccountDigit, OperationType type);
    }
}
