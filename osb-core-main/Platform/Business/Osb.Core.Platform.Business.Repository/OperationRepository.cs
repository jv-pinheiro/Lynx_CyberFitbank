using System.Collections.Generic;
using Osb.Core.Platform.Common.Entity;
using Osb.Core.Platform.Business.Entity.Models;
using Osb.Core.Platform.Business.Repository.Interfaces;
using Osb.Core.Infrastructure.Data.Repository.Interfaces;


namespace Osb.Core.Platform.Business.Repository
{
    public class OperationRepository : IOperationRepository
    {
        private readonly IDbContext<Operation> _context;

        public OperationRepository(IDbContext<Operation> context)
        {
            this._context = context;
        }

        public Operation Save(Operation operation, TransactionScope transactionScope = null)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramOperationType"] = operation.OperationType,
                ["paramUserId"] = operation.CreationUserId
            };

            return _context.ExecuteWithSingleResult("insertoperation", parameters, transactionScope);
        }

        public Operation GetById(long operationId)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramOperationId"] = operationId
            };

            Operation operation = _context.ExecuteWithSingleResult("GetOperationById", parameters);

            return operation;
        }
    }
}