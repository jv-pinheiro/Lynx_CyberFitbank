using System;
using System.Collections.Generic;
using Osb.Core.Platform.Business.Factory.Service.Interfaces;
using Osb.Core.Platform.Business.Service.Interfaces;
using Osb.Core.Platform.Business.Service.Models.Request;
using Osb.Core.Platform.Common.Entity;
using Osb.Core.Platform.Common.Entity.Enums;
using BusinessModel = Osb.Core.Platform.Business.Entity.Models;

namespace Osb.Core.Workers.MoneyTransfer.Generate
{
    public class WorkerService
    {
        private readonly IMoneyTransferServiceFactory _moneyTransferServiceFactory;
        private readonly IExceptionLogServiceFactory _exceptionLogServiceFactory;
        private readonly Settings _settings;

        public WorkerService(IMoneyTransferServiceFactory moneyTransferServiceFactory, IExceptionLogServiceFactory exceptionLogServiceFactory, Settings settings)
        {
            _moneyTransferServiceFactory = moneyTransferServiceFactory;
            _exceptionLogServiceFactory = exceptionLogServiceFactory;
            _settings = settings;
        }

        public void Generate()
        {
            IMoneyTransferService moneyTransferService = _moneyTransferServiceFactory.Create();
            IEnumerable<BusinessModel.MoneyTransfer> moneyTransferList = moneyTransferService.FindMoneyTransferListByStatus(MoneyTransferStatus.Created);

            foreach (BusinessModel.MoneyTransfer moneyTransfer in moneyTransferList)
            {
                try
                {
                    moneyTransferService.GenerateMoneyTransfer(moneyTransfer);
                }
                catch (Exception ex)
                {
                    IExceptionLogService exceptionLogService = _exceptionLogServiceFactory.Create();
                    exceptionLogService.SaveExceptionLog(ex.Message, ExceptionType.OsbWorkerException);

                    moneyTransfer.Attempts += 1;

                    if (moneyTransfer.Attempts >= _settings.Attempts)
                        moneyTransfer.Status = MoneyTransferStatus.Error;

                    moneyTransferService.Update(moneyTransfer);
                }
            }
        }
    }
}
