using Osb.Core.Api.Application.Models.Request;
using Osb.Core.Api.Application.Util;
using Osb.Core.Platform.Auth.Service.Models.Request;

namespace Osb.Core.Api.Application.Mapping
{
    public class AuthMapper
    {
        public AuthenticateRequest Map(LoginRequest authRequest, object companyId)
        {
            return new AuthenticateRequest
            {
                Login = Formatter.RemoveMaskFromTaxId(authRequest.Login),
                Password = authRequest.Password,
                CompanyId = (long)companyId
            };
        }

        public CreateApplicationTokenRequest Map(string key)
        {
            return new CreateApplicationTokenRequest
            {
                Key = key
            };
        }
    }
}