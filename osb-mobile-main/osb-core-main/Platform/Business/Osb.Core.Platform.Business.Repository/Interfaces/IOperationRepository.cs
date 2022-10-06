using Osb.Core.Platform.Business.Entity.Models;
using Osb.Core.Platform.Common.Entity;

namespace Osb.Core.Platform.Business.Repository.Interfaces
{
    public interface IOperationRepository
    {
        Operation Save(Operation operation, TransactionScope transactionScope = null);
    }
}