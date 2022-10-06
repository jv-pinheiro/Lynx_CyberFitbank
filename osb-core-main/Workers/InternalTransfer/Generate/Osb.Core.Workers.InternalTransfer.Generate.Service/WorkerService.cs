using System;
using System.Collections.Generic;
using Osb.Core.Platform.Common.Entity;
using Osb.Core.Platform.Common.Entity.Enums;
using Osb.Core.Platform.Business.Factory.Service.Interfaces;
using Osb.Core.Platform.Business.Service.Interfaces;
using BusinessModel = Osb.Core.Platform.Business.Entity.Models;

namespace Osb.Core.Workers.InternalTransfer.Generate
{
    public class WorkerService
    {
        private readonly IInternalTransferServiceFactory _internalTransferServiceFactory;
        private readonly IExceptionLogServiceFactory _exceptionLogServiceFactory;
        private readonly Settings _settings;

        public WorkerService(IInternalTransferServiceFactory internalTransferServiceFactory, IExceptionLogServiceFactory exceptionLogServiceFactory, Settings settings)
        {
            _internalTransferServiceFactory = internalTransferServiceFactory;
            _exceptionLogServiceFactory = exceptionLogServiceFactory;
            _settings = settings;

        }

        public void Generate()
        {
            IInternalTransferService internalTransferService = _internalTransferServiceFactory.Create();
            IEnumerable<BusinessModel.InternalTransfer> internalTransferList = internalTransferService.FindInternalTransferListByStatus(InternalTransferStatus.Created);

            foreach (BusinessModel.InternalTransfer internalTransfer in internalTransferList)
            {
                try
                {
                    internalTransferService.GenerateInternalTransfer(internalTransfer);
                }
                catch (Exception ex)
                {
                    IExceptionLogService exceptionLogService = _exceptionLogServiceFactory.Create();
                    exceptionLogService.SaveExceptionLog(ex.Message, ExceptionType.OsbWorkerException);

                    internalTransfer.Attempts += 1;

                    if (internalTransfer.Attempts >= _settings.Attempts)
                        internalTransfer.Status = InternalTransferStatus.Error;

                    internalTransferService.Update(internalTransfer);
                }
            }
        }
    }
}
