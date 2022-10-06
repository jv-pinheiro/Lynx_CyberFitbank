using System;
using System.Collections.Generic;
using Osb.Core.Infrastructure.Data.Repository.Interfaces;
using Osb.Core.Platform.Business.Entity.Models;
using Osb.Core.Platform.Business.Repository.Interfaces;
using Osb.Core.Platform.Common.Entity;
using Osb.Core.Platform.Common.Entity.Enums;

namespace Osb.Core.Platform.Business.Repository
{
    public class FavoredRepository : IFavoredRepository
    {
        private readonly IDbContext<Favored> _context;

        public FavoredRepository(IDbContext<Favored> context)
        {
            this._context = context;
        }

        public IEnumerable<Favored> GetByAccountId(long accountId)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramAccountId"] = accountId
            };

            IEnumerable<Favored> favoredList = _context.ExecuteWithMultipleResults("GetFavoredByAccountId", parameters);

            return favoredList;
        }

        public void Save(Favored favored, TransactionScope transactionScope = null)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramAccountId"] = favored.AccountId,
                ["paramTaxId"] = favored.TaxId,
                ["paramName"] = favored.Name,
                ["paramOperationType"] = favored.OperationType,
                ["paramBankName"] = favored.BankName,
                ["paramBank"] = favored.Bank,
                ["paramBankBranch"] = favored.BankBranch,
                ["paramBankAccount"] = favored.BankAccount,
                ["paramBankAccountDigit"] = favored.BankAccountDigit,
                ["paramUserId"] = favored.CreationUserId
            };

            _context.ExecuteWithNoResult("InsertFavored", parameters, transactionScope);
        }

        public IEnumerable<Favored> GetFavored(long accountId, string taxId, string bank, string bankBranch, string bankAccount, string bankAccountDigit, OperationType operationType)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramAccountId"] = accountId,
                ["paramTaxId"] = taxId,
                ["paramBank"] = bank,
                ["paramBankBranch"] = bankBranch,
                ["paramBankAccount"] = bankAccount,
                ["paramBankAccountDigit"] = bankAccountDigit,
                ["paramOperationType"] = operationType
            };

            IEnumerable<Favored> favoredList = _context.ExecuteWithMultipleResults("GetFavored", parameters);

            return favoredList;
        }
    }
}