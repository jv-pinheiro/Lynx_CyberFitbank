using System.Collections.Generic;
using Osb.Core.Platform.Common.Entity;
using Osb.Core.Platform.Business.Entity.Models;
using Osb.Core.Platform.Business.Factory.Repository.Interfaces;
using Osb.Core.Platform.Business.Repository.Interfaces;
using Osb.Core.Platform.Business.Service.Interfaces;
using Osb.Core.Platform.Business.Service.Mapping;
using Osb.Core.Platform.Business.Service.Models.Request;
using Osb.Core.Platform.Business.Service.Models.Result;
using Osb.Core.Platform.Business.Service.Validators;
using Osb.Core.Platform.Integration.Factory.Service.Interfaces;
using Osb.Core.Infrastructure.Data.Repository.Interfaces;
using IntegrationService = Osb.Core.Platform.Integration.Service.FitBank.Interfaces;
using IntegrationRequest = Osb.Core.Platform.Integration.Entity.FitBank.Models.Request;
using IntegrationResponse = Osb.Core.Platform.Integration.Entity.FitBank.Models.Response;
using Osb.Core.Platform.Common.Entity.Enums;
using Osb.Core.Platform.Business.Common;
using Osb.Core.Platform.Integration.Factory.Repository.Interfaces;
using NotificationMapping = Osb.Core.Platform.Integration.Service.FitBank.Mapping;
using IntegrationRepository = Osb.Core.Platform.Integration.Repository.Interfaces;
using Osb.Core.Platform.Integration.Entity.Models;
using Osb.Core.Platform.Business.Util.Resources;

namespace Osb.Core.Platform.Business.Service
{
    public class MoneyTransferService : IMoneyTransferService
    {
        private readonly MoneyTransferValidator _validator;
        private readonly MoneyTransferMapper _mapper;
        private readonly IMoneyTransferServiceFactory _moneyTransferIntegrationServiceFactory;
        private readonly IMoneyTransferRepositoryFactory _moneyTransferRepositoryFactory;
        private readonly IAccountRepositoryFactory _accountRepositoryFactory;
        private readonly IOperationAttachmentRepositoryFactory _operationAttachmentRepositoryFactory;
        private readonly IBankingDataRepositoryFactory _bankingDataRepositoryFactory;
        private IConnectionFactory _connectionFactory;
        private readonly Settings _settings;
        private readonly IOperationRepositoryFactory _operationRepositoryFactory;
        private readonly IOperationTagRepositoryFactory _operationTagRepositoryFactory;
        private readonly INotificationServiceFactory _notificationServiceFactory;
        private readonly INotificationService _notificationService;
        private readonly NotificationMapping.NotificationMapper _notificationMapper;
        private readonly INotificationRepository _notificationRepository;
        private readonly INotificationRepositoryFactoryI _notificationRepositoryFactory;

        public MoneyTransferService(
            IMoneyTransferServiceFactory moneyTransferIntegrationServiceFactory,
            IMoneyTransferRepositoryFactory moneyTransferRepositoryFactory,
            IOperationRepositoryFactory operationRepositoryFactory,
            IOperationAttachmentRepositoryFactory operationAttachmentRepositoryFactory,
            IOperationTagRepositoryFactory operationTagRepositoryFactory,
            IAccountRepositoryFactory accountRepositoryFactory,
            IBankingDataRepositoryFactory bankingDataRepositoryFactory,
            Settings settings,
            IConnectionFactory connectionFactory,
            INotificationServiceFactory notificationServiceFactory,
            INotificationService notificationService,
            INotificationRepository notificationRepository,
            INotificationRepositoryFactoryI notificationRepositoryFactory
        )
        {
            _moneyTransferIntegrationServiceFactory = moneyTransferIntegrationServiceFactory;
            _moneyTransferRepositoryFactory = moneyTransferRepositoryFactory;
            _accountRepositoryFactory = accountRepositoryFactory;
            _bankingDataRepositoryFactory = bankingDataRepositoryFactory;
            _operationRepositoryFactory = operationRepositoryFactory;
            _operationAttachmentRepositoryFactory = operationAttachmentRepositoryFactory;
            _operationTagRepositoryFactory = operationTagRepositoryFactory;
            _mapper = new MoneyTransferMapper();
            _validator = new MoneyTransferValidator();
            _settings = settings;
            _connectionFactory = connectionFactory;
            _notificationServiceFactory = notificationServiceFactory;
            _notificationService = notificationService;
            _notificationMapper = new NotificationMapping.NotificationMapper();
            _notificationRepositoryFactory = notificationRepositoryFactory;
            _notificationRepository = notificationRepository;
        }

        public void Save(MoneyTransferRequest insertMoneyTransferRequest)
        {
            _validator.Validate(insertMoneyTransferRequest);

            TransactionScope transactionScope = _connectionFactory.CreateTransaction();

            try
            {
                BankingData bankingData = BankingData.Create(
                    insertMoneyTransferRequest.Bank,
                    insertMoneyTransferRequest.BankBranch,
                    insertMoneyTransferRequest.BankAccount,
                    insertMoneyTransferRequest.BankAccountDigit,
                    insertMoneyTransferRequest.UserId
                );

                IBankingDataRepository bankingDataRepository = _bankingDataRepositoryFactory.Create();
                BankingData bankingDataResult = bankingDataRepository.Save(bankingData);

                Operation operation = Operation.Create(insertMoneyTransferRequest.UserId, OperationType.MoneyTransfer);
                IOperationRepository operationRepository = _operationRepositoryFactory.Create();
                operation = operationRepository.Save(operation, transactionScope);

                if (insertMoneyTransferRequest.Tags != null)
                {
                    IOperationTagRepository operationTagRepository = _operationTagRepositoryFactory.Create();

                    foreach (string tag in insertMoneyTransferRequest.Tags)
                    {
                        OperationTag operationTag = OperationTag.Create(operation.OperationId, tag, insertMoneyTransferRequest.UserId);
                        operationTagRepository.Save(operationTag, transactionScope);
                    }
                }

                if (insertMoneyTransferRequest.Attachments != null)
                {
                    IOperationAttachmentRepository operationAttachmentRepository = _operationAttachmentRepositoryFactory.Create();
                    AttachmentManagement attachmentManagement = new AttachmentManagement();

                    foreach (Attachment attachment in insertMoneyTransferRequest.Attachments)
                    {
                        OperationAttachment operationAttachment = OperationAttachment.Create(
                            attachment.Content,
                            attachment.Extension,
                            operation.OperationId,
                            insertMoneyTransferRequest.UserId
                        );

                        attachmentManagement.SaveAttachment($"{_settings.FilePath}{operationAttachment.Name}-{operation.OperationId.ToString()}".ToLower(), attachment.Content);
                        operationAttachmentRepository.Save(operationAttachment, transactionScope);
                    }
                }

                MoneyTransfer moneyTransfer = MoneyTransfer.Create(
                    insertMoneyTransferRequest.AccountId,
                    insertMoneyTransferRequest.ToTaxId,
                    insertMoneyTransferRequest.ToName,
                    bankingDataResult.BankingDataId,
                    insertMoneyTransferRequest.Value,
                    operation.OperationId,
                    insertMoneyTransferRequest.UserId,
                    insertMoneyTransferRequest.TransferDate,
                    MoneyTransferStatus.Created,
                    insertMoneyTransferRequest.Description
                );

                IMoneyTransferRepository moneyTransferRepository = _moneyTransferRepositoryFactory.Create();
                moneyTransferRepository.Save(moneyTransfer, transactionScope);

                IAccountRepository accountRepository = _accountRepositoryFactory.Create();
                Account account = accountRepository.GetById(insertMoneyTransferRequest.AccountId);

                PushNotification pushNotification = PushNotification.Create(
                    operation.OperationId,
                    insertMoneyTransferRequest.UserId,
                    account.CompanyId,
                    PushNotificationMsg.MSG_TITLE_0001,
                    null,
                    PushNotificationStatus.Create
                );

                INotificationRepository notificationRepository = _notificationRepositoryFactory.Create();
                notificationRepository.Save(pushNotification, transactionScope);

                transactionScope.Transaction.Commit();
            }
            catch
            {
                transactionScope.Transaction.Rollback();
                throw;
            }
            finally
            {
                transactionScope.Connection.Close();
            }
        }

        public void GenerateMoneyTransfer(MoneyTransfer moneyTransfer)
        {
            IBankingDataRepository bankingDataRepository = _bankingDataRepositoryFactory.Create();
            BankingData bankingData = bankingDataRepository.GetById(moneyTransfer.BankingDataId);

            IAccountRepository accountRepository = _accountRepositoryFactory.Create();
            Account account = accountRepository.GetById(moneyTransfer.FromAccountId);

            IOperationTagRepository operationTagRepository = _operationTagRepositoryFactory.Create();
            IEnumerable<OperationTag> operationTags = operationTagRepository.GetOperationTagsByOperationId(moneyTransfer.OperationId);

            IMoneyTransferRepository moneyTransferRepository = _moneyTransferRepositoryFactory.Create();
            IntegrationRequest.MoneyTransferRequest integrationRequest = _mapper.Map(moneyTransfer, account, bankingData, operationTags);

            IntegrationService.IMoneyTransferService moneyTransferIntergrationService = _moneyTransferIntegrationServiceFactory.Create();
            IntegrationResponse.MoneyTransferResponse moneyTransferResponse = moneyTransferIntergrationService.MoneyTransfer(integrationRequest);

            if (moneyTransferResponse.Status)
            {
                moneyTransfer.ExternalIdentifier = moneyTransferResponse.ExternalIdentifier;
                moneyTransfer.Status = MoneyTransferStatus.Generated;
            }
            else
            {
                moneyTransfer.Attempts += 1;
                if (moneyTransfer.Attempts >= _settings.Attempts)
                    moneyTransfer.Status = MoneyTransferStatus.Error;
            }

            moneyTransferRepository.Update(moneyTransfer);
        }

        public FindExpectedTransferDateResult FindExpectedTransferDate(FindExpectedTransferDateRequest findExpectedTransferDateRequest)
        {
            _validator.Validate(findExpectedTransferDateRequest);

            IntegrationRequest.FindExpectedTransferDateRequest integrationRequest = _mapper.Map(
                findExpectedTransferDateRequest
            );
            IntegrationService.IMoneyTransferService moneyTransferIntergrationService = _moneyTransferIntegrationServiceFactory.Create();
            IntegrationResponse.FindExpectedTransferDateResponse findExpectedTransferDateResponse = moneyTransferIntergrationService.FindExpectedTransferDate(integrationRequest);

            FindExpectedTransferDateResult result = _mapper.Map(findExpectedTransferDateResponse);
            return result;
        }

        public IEnumerable<MoneyTransfer> FindMoneyTransferListByStatus(MoneyTransferStatus status)
        {
            IMoneyTransferRepository moneyTransferRepository = _moneyTransferRepositoryFactory.Create();
            IEnumerable<MoneyTransfer> moneyTransferList = moneyTransferRepository.GetByStatus(status);
            return moneyTransferList;
        }

        public void Update(MoneyTransfer moneyTransfer)
        {
            IMoneyTransferRepository moneyTransferRepository = _moneyTransferRepositoryFactory.Create();

            moneyTransferRepository.Update(moneyTransfer);
        }

        public void UpdateStatus(UpdateMoneyTransferRequest updateMoneyTransferRequest)
        {
            _validator.Validate(updateMoneyTransferRequest);

            IMoneyTransferRepository moneyTransferRepository = _moneyTransferRepositoryFactory.Create();
            MoneyTransfer moneyTransfer = new MoneyTransfer();

            if (updateMoneyTransferRequest.MoneyTransferId != null)
                moneyTransfer = moneyTransferRepository.GetById(updateMoneyTransferRequest.MoneyTransferId.Value);
            else
                moneyTransfer = moneyTransferRepository.GetByExternalIdentifier(updateMoneyTransferRequest.ExternalIdentifier.Value);

            moneyTransfer.Status = updateMoneyTransferRequest.Status;
            moneyTransfer.UpdateUserId = updateMoneyTransferRequest.UserId;

            if (updateMoneyTransferRequest.Status == MoneyTransferStatus.Paid || updateMoneyTransferRequest.Status == MoneyTransferStatus.Error)
            {
                INotificationRepository notificationRepository = _notificationRepositoryFactory.Create();
                PushNotification pushNotification = notificationRepository.GetByOperationId(moneyTransfer.OperationId);

                if (pushNotification != null)
                {
                    moneyTransfer.UpdateUserId = pushNotification.UserId;
                    pushNotification.Status = PushNotificationStatus.CanBeSent;

                    if (updateMoneyTransferRequest.Status == MoneyTransferStatus.Paid)
                        pushNotification.Body = string.Format(PushNotificationMsg.MSG_SUCCESS_0001, moneyTransfer.TransferValue);
                    else if (updateMoneyTransferRequest.Status == MoneyTransferStatus.Error)
                        pushNotification.Body = string.Format(PushNotificationMsg.MSG_ERROR_0001, moneyTransfer.TransferValue);

                    notificationRepository.Update(pushNotification);
                }

            }

            moneyTransferRepository.Update(moneyTransfer);
        }

    }
}
