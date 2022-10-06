using System.Collections.Generic;

namespace Osb.Core.Platform.Common.Entity
{
    public class Settings
    {
        public string JwtSecret { get; set; }
        public int JwtExpirationTime { get; set; }
        public string AesKey { get; set; }
        public string AesIV { get; set; }
        public IDictionary<string, string> ConnectionStrings { get; set; }
        public long LoadValue { get; set; }
        public string LogPath { get; set; }
        public int Timer { get; set; }
        public long LoginAttempts { get; set; }
        public long Attempts { get; set; }
        public long AuthorizationTokenValidateAttempts { get; set; }
        public IDictionary<string, long> ConnectionKey { get; set; }
        public double ApplicationTokenExpirationTime { get; set; }
        public long UserDefault { get; set; }
        public string PushNotificationCredentialPath { get; set; }
        public string FilePath { get; set; }
        public string UrlAddressApi { get; set; }
    }
}