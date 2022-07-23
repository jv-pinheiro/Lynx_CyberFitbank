using System;
using System.Collections.Generic;
using Osb.Core.Platform.Auth.Entity.Models;
using Osb.Core.Platform.Auth.Repository.Interfaces;
using Osb.Core.Infrastructure.Data.Repository.Interfaces;

namespace Osb.Core.Platform.Auth.Repository
{
    public class AuthorizationTokenRepository : IAuthorizationTokenRepository
    {
        private IDbContext<AuthorizationToken> _context;

        public AuthorizationTokenRepository(IDbContext<AuthorizationToken> context)
        {
            _context = context;
        }

        public void Save(AuthorizationToken token)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramUserId"] = token.UserId,
                ["paramAccountId"] = token.AccountId,
                ["paramTaxId"] = token.TaxId,
                ["paramCode"] = token.Code,
                ["paramSalt"] = token.Salt,
                ["paramStatus"] = token.Status,
                ["paramExpirationDate"] = token.ExpirationDate
            };

            _context.ExecuteWithNoResult("InsertAuthorizationToken", parameters);
        }

        public void UnauthorizeTokensByUserIdAndAccountId(long userId, long accountId)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramUserId"] = userId,
                ["paramAccountId"] = accountId,
            };

            _context.ExecuteWithNoResult("UnauthorizeAuthorizationTokensByUserIdAndAccountId", parameters);
        }

        public AuthorizationToken GetByUserIdAndAccountId(long userId, long accountId)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramUserId"] = userId,
                ["paramAccountId"] = accountId,
            };

            AuthorizationToken authorizationToken = _context.ExecuteWithSingleResult("GetAuthorizationTokenByUserIdAndAccountId", parameters);

            return authorizationToken;
        }

        public AuthorizationToken GetByTaxId(string taxId)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramTaxId"] = taxId
            };

            AuthorizationToken authorizationToken = _context.ExecuteWithSingleResult("GetAuthorizationTokenByTaxId", parameters);

            return authorizationToken;
        }

        public void Update(AuthorizationToken authorizationToken, long updateUserId)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramId"] = authorizationToken.AuthorizationTokenId,
                ["paramStatus"] = Convert.ToByte(authorizationToken.Status),
                ["paramValidateAttempts"] = authorizationToken.ValidateAttempts,
                ["paramUpdateUserId"] = updateUserId
            };

            _context.ExecuteWithNoResult("UpdateAuthorizationToken", parameters);
        }
    }
}