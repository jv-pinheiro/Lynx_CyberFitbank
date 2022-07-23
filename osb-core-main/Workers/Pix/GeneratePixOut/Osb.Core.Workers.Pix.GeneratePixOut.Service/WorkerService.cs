using System;
using System.Collections.Generic;
using Osb.Core.Platform.Business.Factory.Service.Interfaces;
using Osb.Core.Platform.Business.Service.Interfaces;
using Osb.Core.Platform.Common.Entity;
using Osb.Core.Platform.Common.Entity.Enums;
using BusinessModel = Osb.Core.Platform.Business.Entity.Models;

namespace Osb.Core.Workers.Pix.GeneratePixOut.Service
{
    public class WorkerService
    {
        private readonly IPixServiceFactory _pixServiceFactory;
        private readonly IExceptionLogServiceFactory _exceptionLogServiceFactory;
        private readonly Settings _settings;

        public WorkerService(IPixServiceFactory pixServiceFactory, IExceptionLogServiceFactory exceptionLogServiceFactory, Settings settings)
        {
            _pixServiceFactory = pixServiceFactory;
            _exceptionLogServiceFactory = exceptionLogServiceFactory;
            _settings = settings;
        }

        public void Generate()
        {
            IPixService pixService = _pixServiceFactory.Create();
            IEnumerable<BusinessModel.PixOut> pixOutList = pixService.FindPixOutByStatus(PixOutStatus.Created);

            foreach (BusinessModel.PixOut pixOut in pixOutList)
            {
                try
                {
                    pixService.GeneratePixOut(pixOut);
                }
                catch (Exception ex)
                {
                    IExceptionLogService exceptionLogService = _exceptionLogServiceFactory.Create();
                    exceptionLogService.SaveExceptionLog(ex.Message, ExceptionType.OsbWorkerException);

                    pixOut.Attempts += 1;

                    if (pixOut.Attempts >= _settings.Attempts)
                        pixOut.Status = PixOutStatus.Error;

                    pixService.UpdatePixOut(pixOut);
                }
            }
        }
    }
}
