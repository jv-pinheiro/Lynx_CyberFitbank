using System;
using Osb.Core.Platform.Common.Entity.Enums;
using Osb.Core.Webhook.Api.Models.Request;
using BusinessService = Osb.Core.Platform.Business.Service.Models.Request;
namespace Osb.Core.Webhook.Api.Mapping
{
    public class MoneyTransferMapper
    {
        public BusinessService.UpdateMoneyTransferRequest Map(UpdateMoneyTransferRequest updateMoneyTransferStatusRequest)
        {
            return new BusinessService.UpdateMoneyTransferRequest
            {
                ExternalIdentifier = updateMoneyTransferStatusRequest.ExternalIdentifier,
                Status = Enum.Parse<MoneyTransferStatus>(updateMoneyTransferStatusRequest.Status)
            };
        }
    }
}