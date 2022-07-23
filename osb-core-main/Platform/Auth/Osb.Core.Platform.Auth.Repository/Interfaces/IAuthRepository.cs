using Osb.Core.Platform.Auth.Entity.Models;

namespace Osb.Core.Platform.Auth.Repository.Interfaces
{
    public interface IAuthRepository
    {
         UserCredential GetUserCredentialByUserId(long? userId);
    }
}