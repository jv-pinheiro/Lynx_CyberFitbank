using System.Collections.Generic;
using Osb.Core.Infrastructure.Data.Repository.Interfaces;
using Osb.Core.Platform.Auth.Entity.Models;
using Osb.Core.Platform.Auth.Repository.Interfaces;

namespace Osb.Core.Platform.Auth.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private IDbContext<UserCredential> _context;

        public AuthRepository(IDbContext<UserCredential> context)
        {
            _context = context;
        }

        public UserCredential GetUserCredentialByUserId(long? userId)
        {
            var parameters = new Dictionary<string, dynamic>
            {
                ["paramUserId"] = userId
            };

            UserCredential userCredential = _context.ExecuteWithSingleResult("GetUserCredentialByUserId", parameters);

            return userCredential;
        }
    }
}