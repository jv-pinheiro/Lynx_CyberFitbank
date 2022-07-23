namespace Osb.Core.Platform.Auth.Service.Models.Request
{
    public class AuthenticateRequest
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public long CompanyId { get; set; }
    }
}