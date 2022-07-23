using Osb.Core.Platform.Business.Service.Interfaces;
using Osb.Core.Platform.Business.Service.Mapping;
using Osb.Core.Platform.Business.Service.Models.Request;
using Osb.Core.Platform.Business.Service.Models.Result;
using Osb.Core.Platform.Business.Service.Validators;
using IntegrationService = Osb.Core.Platform.Integration.Service.FitBank.Interfaces;
using IntegrationRequest = Osb.Core.Platform.Integration.Entity.FitBank.Models.Request;
using IntegrationResponse = Osb.Core.Platform.Integration.Entity.FitBank.Models.Response;
using Osb.Core.Platform.Integration.Factory.Service.Interfaces;
using Osb.Core.Platform.Business.Factory.Repository.Interfaces;
using Osb.Core.Platform.Business.Repository.Interfaces;
using Osb.Core.Platform.Business.Entity.Models;
using Osb.Core.Platform.Common.Entity;
using Osb.Core.Infrastructure.Data.Repository.Interfaces;
using System;
using Osb.Core.Platform.Business.Common;
using Osb.Core.Platform.Common.Entity.Enums;
using System.Collections.Generic;
using Osb.Core.Platform.Business.Util.Resources.PixExcMsg;
using System.Linq;

namespace Osb.Core.Platform.Business.Service
{
    public class PixService : IPixService
    {
        private readonly PixValidator _validator;
        private readonly PixMapper _mapper;
        private readonly IPixServiceFactory _pixIntegrationServiceFactory;
        private readonly IPixRepositoryFactory _pixRepositoryFactory;
        private readonly IOperationRepositoryFactory _operationRepositoryFactory;
        private readonly IAccountRepositoryFactory _accountRepositoryFactory;
        private readonly IOperationTagRepositoryFactory _operationTagRepositoryFactory;
        private IConnectionFactory _connectionFactory;
        private readonly Settings _settings;

        public PixService(
            IPixServiceFactory pixIntegrationServiceFactory,
            IPixRepositoryFactory pixRepositoryFactory,
            IAccountRepositoryFactory accountRepositoryFactory,
            IOperationRepositoryFactory operationRepositoryFactory,
            IOperationTagRepositoryFactory operationTagRepositoryFactory,
            IConnectionFactory connectionFactory,
            Settings settings
        )
        {
            _pixIntegrationServiceFactory = pixIntegrationServiceFactory;
            _pixRepositoryFactory = pixRepositoryFactory;
            _accountRepositoryFactory = accountRepositoryFactory;
            _operationRepositoryFactory = operationRepositoryFactory;
            _operationTagRepositoryFactory = operationTagRepositoryFactory;
            _mapper = new PixMapper();
            _validator = new PixValidator();
            _settings = settings;
            _connectionFactory = connectionFactory;
            _operationRepositoryFactory = operationRepositoryFactory;
            _operationTagRepositoryFactory = operationTagRepositoryFactory;
            _settings = settings;
        }

        public CreatePixKeyResult CreatePixKey(CreatePixKeyRequest createPixKeyRequest)
        {
            _validator.Validate(createPixKeyRequest);

            TransactionScope transactionScope = _connectionFactory.CreateTransaction();

            try
            {
                IAccountRepository accountRepository = _accountRepositoryFactory.Create();

                IntegrationRequest.CreatePixKeyRequest integrationRequest = _mapper.Map(createPixKeyRequest);

                IntegrationService.IPixService pixIntegrationService = _pixIntegrationServiceFactory.Create();
                IntegrationResponse.CreatePixKeyResponse createPixKeyResponse = new IntegrationResponse.CreatePixKeyResponse();

                bool isOk = false;
                DateTime start = DateTime.Now;

                while (!isOk)
                {
                    createPixKeyResponse = pixIntegrationService.CreatePixKey(integrationRequest);

                    if (createPixKeyResponse.Status)
                    {
                        if (createPixKeyRequest.PixKeyType == PixKeyType.RamdomKeyCode)
                        {
                            FindPixKeyListRequest findPixKeyListRequest = new FindPixKeyListRequest();
                            findPixKeyListRequest.AccountId = createPixKeyRequest.AccountId;
                            findPixKeyListRequest.UserId = createPixKeyRequest.UserId;
                            findPixKeyListRequest.TaxId = createPixKeyRequest.TaxId;
                            findPixKeyListRequest.Bank = createPixKeyRequest.SPBBank;
                            findPixKeyListRequest.BankBranch = createPixKeyRequest.SPBBankBranch;
                            findPixKeyListRequest.BankAccount = createPixKeyRequest.SPBBankAccount;
                            findPixKeyListRequest.BankAccountDigit = createPixKeyRequest.SPBBankAccountDigit;

                            FindPixKeyListResult findPixKeyListResult = FindPixKeyList(findPixKeyListRequest);

                            foreach (PixKey pixKey in findPixKeyListResult.PixKeyList)
                                if (pixKey.PixKeyType == PixKeyType.RamdomKeyCode)
                                    isOk = true;
                        }
                        else isOk = true;
                    }

                    TimeSpan elapsed = DateTime.Now - start;
                    if (elapsed.Seconds >= 10)
                        isOk = true;
                }

                if (!createPixKeyResponse.Status)
                    throw new OsbBusinessException(createPixKeyResponse.Message);

                CreatePixKeyResult result = _mapper.Map(createPixKeyResponse);

                transactionScope.Transaction.Commit();

                return result;
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

        public FindPixKeyListResult FindPixKeyList(FindPixKeyListRequest findPixKeyListRequest)
        {
            _validator.Validate(findPixKeyListRequest);

            IntegrationRequest.FindPixKeyListRequest integrationRequest = _mapper.Map(findPixKeyListRequest);

            IntegrationService.IPixService pixIntegrationService = _pixIntegrationServiceFactory.Create();
            IntegrationResponse.FindPixKeyListResponse findPixKeyListResponse = pixIntegrationService.FindPixKeyList(integrationRequest);

            FindPixKeyListResult result = _mapper.Map(findPixKeyListResponse);

            result.PixKeyList.ToList().RemoveAll(x => x.Status != PixKeyStatus.Registering || x.Status != PixKeyStatus.Registered);

            return result;
        }

        public ConfirmPixKeyHoldResult ConfirmPixKeyHold(ConfirmPixKeyHoldRequest confirmPixKeyHoldRequest)
        {
            _validator.Validate(confirmPixKeyHoldRequest);

            IAccountRepository accountRepository = _accountRepositoryFactory.Create();
            Account account = accountRepository.GetById(confirmPixKeyHoldRequest.AccountId);

            IntegrationRequest.ConfirmPixKeyHoldRequest integrationRequest = _mapper.Map(confirmPixKeyHoldRequest, account);

            IntegrationService.IPixService pixIntegrationService = _pixIntegrationServiceFactory.Create();
            IntegrationResponse.ConfirmPixKeyHoldResponse confirmPixKeyHoldResponse = pixIntegrationService.ConfirmPixKeyHold(integrationRequest);

            ConfirmPixKeyHoldResult result = _mapper.Map(confirmPixKeyHoldResponse);

            return result;

        }

        public ResendPixKeyTokenResult ResendPixKeyToken(ResendPixKeyTokenRequest resendPixKeyTokenRequest)
        {
            _validator.Validate(resendPixKeyTokenRequest);

            IntegrationRequest.ResendPixKeyTokenRequest integrationRequest = _mapper.Map(resendPixKeyTokenRequest);

            IntegrationService.IPixService pixIntegrationService = _pixIntegrationServiceFactory.Create();
            IntegrationResponse.ResendPixKeyTokenResponse resendPixKeyTokenResponse = pixIntegrationService.ResendPixKeyToken(integrationRequest);

            ResendPixKeyTokenResult result = _mapper.Map(resendPixKeyTokenResponse);

            return result;
        }


        public CancelPixKeyResult CancelPixKey(CancelPixKeyRequest cancelPixKeyRequest)
        {
            _validator.Validate(cancelPixKeyRequest);

            IntegrationRequest.CancelPixKeyRequest integrationRequest = _mapper.Map(cancelPixKeyRequest);

            IntegrationService.IPixService PixIntegrationService = _pixIntegrationServiceFactory.Create();
            IntegrationResponse.CancelPixKeyResponse cancelPixKeyResponse = PixIntegrationService.CancelPixKey(integrationRequest);

            CancelPixKeyResult result = _mapper.Map(cancelPixKeyResponse);

            return result;
        }

        public FindInfosPixKeyResult FindInfosPixKey(FindInfosPixKeyRequest findInfosPixKeyRequest)
        {
            _validator.Validate(findInfosPixKeyRequest);

            IntegrationRequest.FindInfosPixKeyRequest integrationRequest = _mapper.Map(findInfosPixKeyRequest);

            IntegrationService.IPixService PixIntegrationService = _pixIntegrationServiceFactory.Create();
            IntegrationResponse.FindInfosPixKeyResponse FindInfosPixKeyResponse = PixIntegrationService.FindInfosPixKey(integrationRequest);

            FindInfosPixKeyResult result = _mapper.Map(FindInfosPixKeyResponse);

            return result;
        }

        public void SavePixOut(GeneratePixOutRequest generatePixOutRequest)
        {
            _validator.Validate(generatePixOutRequest);

            TransactionScope transactionScope = _connectionFactory.CreateTransaction();

            try
            {
                Operation operation = Operation.Create(generatePixOutRequest.UserId, OperationType.PixOut);
                IOperationRepository operationRepository = _operationRepositoryFactory.Create();
                operation = operationRepository.Save(operation, transactionScope);

                if (generatePixOutRequest.Tags != null)
                {
                    IOperationTagRepository operationTagRepository = _operationTagRepositoryFactory.Create();

                    foreach (string tag in generatePixOutRequest.Tags)
                    {
                        OperationTag operationTag = OperationTag.Create(operation.OperationId, tag, generatePixOutRequest.UserId);
                        operationTagRepository.Save(operationTag, transactionScope);
                    }
                }

                PixOut pixOut = PixOut.Create(generatePixOutRequest.AccountId, operation.OperationId, generatePixOutRequest.UserId, generatePixOutRequest.ToName, generatePixOutRequest.ToTaxId,
                                            generatePixOutRequest.ToBank, generatePixOutRequest.ToBankBranch, generatePixOutRequest.ToBankAccount, generatePixOutRequest.ToBankAccountDigit,
                                            generatePixOutRequest.Value, generatePixOutRequest.PaymentDate, generatePixOutRequest.CustomerMessage, generatePixOutRequest.PixKey,
                                            generatePixOutRequest.PixKeyType, generatePixOutRequest.Description, generatePixOutRequest.AccountType);

                IPixRepository pixRepository = _pixRepositoryFactory.Create();
                pixRepository.Save(pixOut, transactionScope);

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

        public void GeneratePixOut(PixOut pixOut)
        {
            IOperationTagRepository operationTagRepository = _operationTagRepositoryFactory.Create();
            IEnumerable<OperationTag> operationTags = operationTagRepository.GetOperationTagsByOperationId(pixOut.OperationId);

            IAccountRepository accountRepository = _accountRepositoryFactory.Create();
            Account account = accountRepository.GetById(pixOut.AccountId);

            if (string.IsNullOrEmpty(account.SPBBank) || string.IsNullOrEmpty(account.SPBBankBranch) || string.IsNullOrEmpty(account.SPBBankAccount) || string.IsNullOrEmpty(account.SPBBankAccountDigit))
                throw new OsbBusinessException(PixExcMsg.EXC0007);

            IntegrationRequest.GeneratePixOutRequest integrationRequest = _mapper.Map(pixOut, account, operationTags);

            IntegrationService.IPixService pixIntegrationService = _pixIntegrationServiceFactory.Create();
            IntegrationResponse.GeneratePixOutResponse response = pixIntegrationService.GeneratePixOut(integrationRequest);

            if (response.Status)
            {
                pixOut.ExternalIdentifier = response.ExternalIdentifier;
                pixOut.CustomerMessage = response.Message;
                pixOut.Status = PixOutStatus.Generated;
            }
            else
            {
                pixOut.Attempts += 1;
                if (pixOut.Attempts >= _settings.Attempts)
                    pixOut.Status = PixOutStatus.Error;
            }

            IPixRepository pixRepository = _pixRepositoryFactory.Create();
            pixRepository.Update(pixOut);
        }

        public void UpdatePixOut(PixOut pixOut)
        {
            IPixRepository pixRepository = _pixRepositoryFactory.Create();
            pixRepository.Update(pixOut);
        }

        public IEnumerable<PixOut> FindPixOutByStatus(PixOutStatus pixOutStatus)
        {
            IPixRepository pixRepository = _pixRepositoryFactory.Create();
            IEnumerable<PixOut> pixOutList = pixRepository.GetByStatus(pixOutStatus);

            return pixOutList;
        }

        public void CreateRefundPixIn(RefundPixInRequest refundPixInRequest)
        {

            _validator.Validate(refundPixInRequest);

            TransactionScope transactionScope = _connectionFactory.CreateTransaction();

            try
            {
                Operation operation = Operation.Create(refundPixInRequest.UserId, OperationType.RefundPixIn);
                IOperationRepository operationRepository = _operationRepositoryFactory.Create();
                operation = operationRepository.Save(operation, transactionScope);

                if (refundPixInRequest.Tags != null)
                {
                    IOperationTagRepository operationTagRepository = _operationTagRepositoryFactory.Create();
                    foreach (string tag in refundPixInRequest.Tags)
                    {
                        OperationTag operationTag = OperationTag.Create(operation.OperationId, tag, refundPixInRequest.UserId);
                        operationTagRepository.Save(operationTag, transactionScope);
                    }
                }

                RefundPixIn refundPixIn = RefundPixIn.Create(
                                                        refundPixInRequest.UserId,
                                                        refundPixInRequest.AccountId,
                                                        refundPixInRequest.ToTaxId,
                                                        refundPixInRequest.ToName,
                                                        refundPixInRequest.ToBank,
                                                        refundPixInRequest.ToBankAccount,
                                                        refundPixInRequest.ToBankBranch,
                                                        refundPixInRequest.ToBankAccountDigit,
                                                        refundPixInRequest.RefundValue,
                                                        refundPixInRequest.CustomerMessage,
                                                        refundPixInRequest.DocumentNumber,
                                                        operation.OperationId
                                                    );

                IPixRepository pixRepository = _pixRepositoryFactory.Create();
                pixRepository.Save(refundPixIn, transactionScope);

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

        public void GenerateRefundPixIn(RefundPixIn refundPixIn)
        {
            IOperationTagRepository operationTagRepository = _operationTagRepositoryFactory.Create();
            IEnumerable<OperationTag> operationTags = operationTagRepository.GetOperationTagsByOperationId(refundPixIn.OperationId);

            IAccountRepository accountRepository = _accountRepositoryFactory.Create();
            Account account = accountRepository.GetById(refundPixIn.AccountId);

            if (string.IsNullOrEmpty(account.SPBBank) || string.IsNullOrEmpty(account.SPBBankBranch) || string.IsNullOrEmpty(account.SPBBankAccount) || string.IsNullOrEmpty(account.SPBBankAccountDigit))
                throw new OsbBusinessException(PixExcMsg.EXC0007);

            IntegrationRequest.RefundPixInRequest integrationRequest = _mapper.Map(refundPixIn, account, operationTags);

            IntegrationService.IPixService refundPixInIntegrationService = _pixIntegrationServiceFactory.Create();
            IntegrationResponse.RefundPixInResponse response = refundPixInIntegrationService.GenerateRefundPixIn(integrationRequest);

            if (response.Status)
            {
                refundPixIn.ExternalIdentifier = response.ExternalIdentifier;
                refundPixIn.Status = RefundPixInStatus.Generated;
            }
            else
            {
                if (++refundPixIn.Attempts == _settings.Attempts)
                    refundPixIn.Status = RefundPixInStatus.Error;
            }

            Update(refundPixIn);
        }

        public IEnumerable<RefundPixIn> FindRefundPixInListByStatus(RefundPixInStatus refundPixInStatus)
        {
            IPixRepository pixRepository = _pixRepositoryFactory.Create();
            IEnumerable<RefundPixIn> refundPixIns = pixRepository.GetByStatus(refundPixInStatus);

            return refundPixIns;
        }

        public void Update(RefundPixIn refundPixIn)
        {
            IPixRepository pixRepository = _pixRepositoryFactory.Create();
            pixRepository.Update(refundPixIn);
        }

        public PixQRCodeResult GenerateStaticPixQRCode(GenerateStaticPixQRCodeRequest generateStaticPixQRCodeRequest)
        {
            _validator.Validate(generateStaticPixQRCodeRequest);

            TransactionScope transactionScope = _connectionFactory.CreateTransaction();
            try
            {
                IPixRepository pixRepository = _pixRepositoryFactory.Create();
                PixQRCodeResult result;

                if (generateStaticPixQRCodeRequest.PrincipalValue == null)
                {
                    StaticPixQRCode storedQRCode = pixRepository.GetStaticPixQRCode(generateStaticPixQRCodeRequest.PixKeyType, generateStaticPixQRCodeRequest.UserId, generateStaticPixQRCodeRequest.AccountId);
                    if (storedQRCode != null)
                    {
                        result = _mapper.Map(storedQRCode);
                        return result;
                    }
                }

                IAccountRepository accountRepository = _accountRepositoryFactory.Create();
                Account account = accountRepository.GetById(generateStaticPixQRCodeRequest.AccountId);

                IntegrationService.IPixService pixIntegrationService = _pixIntegrationServiceFactory.Create();

                IntegrationRequest.GenerateStaticPixQRCodeRequest integrationRequestGenerate = _mapper.Map(generateStaticPixQRCodeRequest, account);
                IntegrationResponse.GenerateStaticPixQRCodeResponse generateStaticPixQRCodeResponse = pixIntegrationService.GenerateStaticPixQRCode(integrationRequestGenerate);

                GetPixQRCodeRequest getPixQRCodeRequest = GetPixQRCodeRequest.Create(generateStaticPixQRCodeResponse.ExternalIdentifier, account.TaxId, account.AccountId);
                PixQRCode qrCode = GetPixQrCode(getPixQRCodeRequest);

                if (generateStaticPixQRCodeRequest.PrincipalValue == null)
                    pixRepository.SaveStaticPixQRCode(generateStaticPixQRCodeResponse.ExternalIdentifier, qrCode.QRCode, qrCode.HashCode, generateStaticPixQRCodeRequest.PixKeyType, generateStaticPixQRCodeRequest.UserId, generateStaticPixQRCodeRequest.AccountId, transactionScope);

                result = _mapper.Map(qrCode);

                transactionScope.Transaction.Commit();
                return result;
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

        public PixQRCodeResult GenerateDynamicPixQrCode(GenerateDynamicPixQrCodeRequest generateDynamicPixQrCodeRequest)
        {
            _validator.Validate(generateDynamicPixQrCodeRequest);

            IAccountRepository accountRepository = _accountRepositoryFactory.Create();
            Account account = accountRepository.GetById(generateDynamicPixQrCodeRequest.AccountId);

            IntegrationService.IPixService pixIntegrationService = _pixIntegrationServiceFactory.Create();

            IntegrationRequest.GenerateDynamicPixQrCodeRequest integrationRequestGenerate = _mapper.Map(generateDynamicPixQrCodeRequest, account);
            IntegrationResponse.GenerateDynamicPixQrCodeResponse generateDynamicPixQRCodeResponse = pixIntegrationService.GenerateDynamicPixQrCode(integrationRequestGenerate);

            GetPixQRCodeRequest getPixQRCodeRequest = GetPixQRCodeRequest.Create(generateDynamicPixQRCodeResponse.ExternalIdentifier, account.TaxId, account.AccountId);
            PixQRCode qrCode = GetPixQrCode(getPixQRCodeRequest);
            PixQRCodeResult result = _mapper.Map(qrCode);

            return result;
        }

        public PixQRCode GetPixQrCode(GetPixQRCodeRequest getPixQRCodeRequest)
        {
            _validator.Validate(getPixQRCodeRequest);

            IntegrationService.IPixService pixIntegrationService = _pixIntegrationServiceFactory.Create();

            IntegrationRequest.GetPixQRCodeRequest integrationRequestGet = _mapper.Map(getPixQRCodeRequest.ExternalIdentifier, getPixQRCodeRequest.AccountId, getPixQRCodeRequest.TaxId);
            IntegrationResponse.GetPixQRCodeResponse getPixQRCodeResponse = pixIntegrationService.GetPixQRCode(integrationRequestGet);

            DateTime initialDate = DateTime.Now;

            while ((getPixQRCodeResponse.PixQRCode.HashCode == " " && getPixQRCodeResponse.PixQRCode.QRCodeBase64 == " "))
            {
                getPixQRCodeResponse = pixIntegrationService.GetPixQRCode(integrationRequestGet);

                TimeSpan elapsedTime = DateTime.Now - initialDate;
                if (elapsedTime.Seconds >= 10)
                    throw new OsbBusinessException(PixExcMsg.EXC0022);
            };

            PixQRCode result = _mapper.Map(getPixQRCodeResponse);
            return result;
        }

        public FindInfoPixQRCodeResult FindInfoPixQRCode(FindInfoPixQRCodeRequest findInfoPixQRCodeRequest)
        {
            _validator.Validate(findInfoPixQRCodeRequest);

            IntegrationRequest.FindInfoPixQRCodeRequest integrationRequest = _mapper.Map(findInfoPixQRCodeRequest);

            IntegrationService.IPixService PixIntegrationService = _pixIntegrationServiceFactory.Create();
            IntegrationResponse.FindInfoPixQRCodeResponse findInfoPixQRCodeResponse = PixIntegrationService.FindInfoPixQRCode(integrationRequest);

            FindInfoPixQRCodeResult result = _mapper.Map(findInfoPixQRCodeResponse);

            return result;
        }
    }
}