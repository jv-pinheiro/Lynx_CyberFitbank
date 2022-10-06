using System;
using System.Collections.Generic;
using Osb.Core.Platform.Common.Entity;
using Osb.Core.Platform.Business.Factory.Service.Interfaces;
using Osb.Core.Platform.Business.Service.Interfaces;
using Osb.Core.Platform.Business.Service.Models.Request;
using Osb.Core.Platform.Common.Entity.Enums;
using BusinessModel = Osb.Core.Platform.Business.Entity.Models;

namespace Osb.Core.Workers.BoletoPayment.Generate
{
    public class WorkerService
    {
        private readonly IBoletoPaymentServiceFactory _boletoPaymentServiceFactory;
        private readonly IExceptionLogServiceFactory _exceptionLogServiceFactory;
        private readonly Settings _settings;

        public WorkerService(IBoletoPaymentServiceFactory boletoPaymentServiceFactory, IExceptionLogServiceFactory exceptionLogServiceFactory, Settings settings)
        {
            _boletoPaymentServiceFactory = boletoPaymentServiceFactory;
            _exceptionLogServiceFactory = exceptionLogServiceFactory;
            _settings = settings;
        }

        public void Generate()
        {
            IBoletoPaymentService boletoPaymentService = _boletoPaymentServiceFactory.Create();
            IEnumerable<BusinessModel.BoletoPayment> boletoPaymentList = boletoPaymentService.FindBoletoPaymentListByStatus(BoletoPaymentStatus.Created);

            foreach (BusinessModel.BoletoPayment boletoPayment in boletoPaymentList)
            {
                try
                {
                    boletoPaymentService.GenerateBoletoPayment(boletoPayment);
                }
                catch (Exception ex)
                {
                    IExceptionLogService exceptionLogService = _exceptionLogServiceFactory.Create();
                    exceptionLogService.SaveExceptionLog(ex.Message, ExceptionType.OsbWorkerException);

                    boletoPayment.Attempts += 1;

                    if (boletoPayment.Attempts >= _settings.Attempts)
                        boletoPayment.Status = BoletoPaymentStatus.Error;

                    boletoPaymentService.UpdateBoletoPayment(boletoPayment);
                }
            }
        }
    }
}