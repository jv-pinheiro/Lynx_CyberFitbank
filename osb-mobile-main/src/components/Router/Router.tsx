import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ProtectedRoute } from 'components/ProtectedRoute'
import { SignIn } from 'features/authentication/pages/SignIn'
import { Welcome } from 'features/onboarding/pages/Welcome'
import { Terms } from 'features/onboarding/pages/Terms'
import { ActivateAccount } from 'features/onboarding/pages/ActivateAccount'
import { AccountActivationCompleted } from 'features/onboarding/pages/AccountActivationCompleted'
import { AccountActivationCompletedForCard } from 'features/onboarding/pages/AccountActivationCompletedForCard'
import { CreatePassword } from 'features/onboarding/pages/ActivateBySMS/CreatePasswordForSMS'
import { ConfirmPassword } from 'features/onboarding/pages/ActivateBySMS/ConfirmPasswordForSMS'
import { ActivationToken } from 'features/onboarding/pages/ActivateBySMS/ActivationTokenForSMS'
import { EnterTaxPayer } from 'features/onboarding/pages/ActivateBySMS/EnterTaxPayerForSMS'
import { EnterTaxPayerForCard } from 'features/onboarding/pages/ActivateByCard/EnterTaxPayerForCard'
import { EnterIdentifierForCard } from 'features/onboarding/pages/ActivateByCard/EnterIdentifierForCard'
import { EnterDigitsForCard } from 'features/onboarding/pages/ActivateByCard/EnterDigitsForCard'
import { EnterPhoneForCard } from 'features/onboarding/pages/ActivateByCard/EnterPhoneForCard'
import { CreatePasswordForCard } from 'features/onboarding/pages/ActivateByCard/CreatePasswordForCard'
import { ConfirmPasswordForCard } from 'features/onboarding/pages/ActivateByCard/ConfirmPasswordForCard'
import { InvalidDataForCard } from 'features/onboarding/pages/ActivateByCard/InvalidDataForCard'
import { EnterBirthDateForCard } from 'features/onboarding/pages/ActivateByCard/EnterBirthDateForCard'
import { AccountEmail } from 'features/onboarding/pages/AccountEmail'
import { BankStatement } from 'features/account/pages/BankStatement'
import { Home } from 'features/account/pages/Home'
import { AllAccounts } from 'features/account/pages/AllAccounts'
import { SignOut } from 'features/authentication/pages/SignOut'
import { AccountSettings } from 'features/account/pages/AccountSettings'
import { BankStatementFilter } from 'features/account/pages/BankStatementFilter'
import { Details } from 'features/account/pages/Details'
import { Receipt } from 'features/account/pages/Receipt'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'
import { AttachDocuments } from 'features/transference/pages/AttachDocuments'
import { FavoredAccountSelection } from 'features/transference/pages/FavoredAccountSelection'
import { ScheduleTransfer } from 'features/transference/pages/ScheduleTransfer'
import { Summary } from 'features/transference/pages/Summary/Summary'
import { TransferDescription } from 'features/transference/pages/TransferDescription'
import { Transference } from 'features/transference/pages/Transference/Transference'
import { TransferReceipt } from 'features/transference/pages/TransferReceipt/'
import { TransferValue } from 'features/transference/pages/TransferValue'
import { TransferenceRoutes } from 'features/transference/constants/routes'
import { FavoredIdentification } from 'features/transference/pages/FavoredIdentification'
import { UserRoutes } from 'features/user/constants/routes'
import { UserInformation } from 'features/user/pages/UserInformation'
import { ChangeEmail } from 'features/user/pages/ChangeEmail'
import { ChangePhone } from 'features/user/pages/ChangePhone'
import { ChangeNickname } from 'features/user/pages/ChangeNickname'
import { ChangePassword } from 'features/user/pages/ChangePassword'
import { ChooseNewPassword } from 'features/user/pages/ChooseNewPassword'
import { ConfirmNewPasswordUserInformation } from 'features/user/pages/ConfirmNewPassword'
import { CurrentAddress } from 'features/user/pages/CurrentAddress'
import { ChangeAddress } from 'features/user/pages/ChangeAddress'
import { ChangeConclude } from 'features/user/pages/ChangeConclude'
import { FavoredName } from 'features/transference/pages/FavoredName'
import { SelectBank } from 'features/transference/pages/SelectBank'
import { SelectAccountType } from 'features/transference/pages/SelectAccountType'
import { BankBranch } from 'features/transference/pages/BankBranch'
import { AccountNumber } from 'features/transference/pages/AccountNumber'
import { EditAccount } from 'features/account/pages/EditAccount'
import { QrCodeTransferRoutes } from 'features/qrCodeTransfer/constants/routes'
import { QrCodeTransfer } from 'features/qrCodeTransfer/pages/QrCodeTransfer/QrCodeTransfer'
import { GenerateQrCodeTransfer } from 'features/qrCodeTransfer/pages/GenerateQrCodeTransfer/GenerateQrCodeTransfer'
import { ShowQrCodeTransfer } from 'features/qrCodeTransfer/pages/ShowQrCodeTransfer'
import { ReadQrCodeTransfer } from 'features/qrCodeTransfer/pages/ReadQrCodeTransfer'
import { QrCodeTransferSendingDetails } from 'features/qrCodeTransfer/pages/QrCodeTransferSendingDetails'
import { ValidatePhone } from 'features/onboarding/pages/ActivateBySMS/ValidatePhoneForSMS/ValidatePhoneForSMS'
import { BirthDate } from 'features/onboarding/pages/ActivateBySMS/BirthDateForSMS'
import { CreateName } from 'features/onboarding/pages/ActivateBySMS/CreateNameForSMS'
import { CardRoutes } from 'features/card/constants/routes'
import { CardManagement } from 'features/card/pages/CardManagement'
import { CardOption } from 'features/card/pages/CardOption'
import { EnterCurrentPassword } from 'features/card/pages/ChangePassword/EnterCurrentPassword'
import { EnterNewPassword } from 'features/card/pages/ChangePassword/EnterNewPassword'
import { ConfirmNewPassword } from 'features/card/pages/ChangePassword/ConfirmNewPassword'
import { CancellationReplacementCard } from 'features/card/pages/CancellationReplacementCard'
import { CancelReason } from 'features/card/pages/Cancellation/CancelReason'
import { CancelCardAlert } from 'features/card/pages/Cancellation/CancelCardAlert'
import { BlockingReason } from "features/card/pages/RequestDuplicate/BlockingReason";
import { BlockCardAlert } from "features/card/pages/RequestDuplicate/BlockCardAlert";
import { AddressConfirmation } from "features/card/pages/RequestDuplicate/AddressConfirmation";
import { ReplacementDetails } from "features/card/pages/RequestDuplicate/ReplacementDetails";
import { UpdateAddress } from "features/card/pages/RequestDuplicate/UpdateAddress";
import { AssociateNewCard } from 'features/card/pages/AssociateNewCard/AssociateNewCard'
import { AssociateFourDigits } from 'features/card/pages/AssociateNewCard/AssociateFourDigits'
import { AssociateNewCardCheckData } from 'features/card/pages/AssociateNewCard/AssociateNewCardCheck'
import { LandingPage } from 'features/onboarding/pages/LandingPage'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { PaymentDarj } from 'features/taxPayment/pages/Darj/PaymentDarj'
import { PaymentDarjType } from 'features/taxPayment/pages/Darj/PaymentDarjType'
import { PaymentDarjValues } from 'features/taxPayment/pages/Darj/PaymentDarjValues'
import { PaymentDarjDueDate } from 'features/taxPayment/pages/Darj/PaymentDarjDueDate'
import { PaymentDarjDescription } from 'features/taxPayment/pages/Darj/PaymentDarjDescription'
import { PaymentDarjSummary } from 'features/taxPayment/pages/Darj/PaymentDarjSummary'
import { PaymentDarjCodeNumber } from 'features/taxPayment/pages/Darj/PaymentDarjCodeNumber'
import { PaymentGare } from 'features/taxPayment/pages/Gare/PaymentGare'
import { PaymentGareDateType } from 'features/taxPayment/pages/Gare/PaymentGareDateType'
import { PaymentGareValues } from 'features/taxPayment/pages/Gare/PaymentGareValues/PaymentGareValues'
import { PaymentGareDueDate } from 'features/taxPayment/pages/Gare/PaymentGareDueDate'
import { PaymentGareDescription } from 'features/taxPayment/pages/Gare/PaymentGareDescription'
import { PaymentGareSummary } from 'features/taxPayment/pages/Gare/PaymentGareSummary'
import { PaymentGareCodeNumber } from 'features/taxPayment/pages/Gare/PaymentGareCodeNumber'
import { PaymentFgts } from 'features/taxPayment/pages/Fgts/PaymentFgts'
import { PaymentFgtsValues } from 'features/taxPayment/pages/Fgts/PaymentFgtsValues'
import { PaymentFgtsIdentifier } from 'features/taxPayment/pages/Fgts/PaymentFgtsIdentifier'
import { PaymentFgtsDate } from 'features/taxPayment/pages/Fgts/PaymentFgtsDate'
import { PaymentFgtsDescription } from 'features/taxPayment/pages/Fgts/PaymentFgtsDescription'
import { PaymentFgtsSummary } from 'features/taxPayment/pages/Fgts/PaymentFgtsSummary'
import { PaymentFgtsBarCode } from 'features/taxPayment/pages/Fgts/PaymentFgtsBarCode'
import { PaymentFgtsCodeRevenue } from 'features/taxPayment/pages/Fgts/PaymentFgtsCodeRevenue'
import { TopUpSchedule } from 'features/topUp/pages/TopUpSchedule'
import { TopUpNumber } from 'features/topUp/pages/TopUpNumber'
import { Help } from 'features/account/pages/Help'
import { TopUp } from 'features/topUp/pages/TopUp'
import { PeriodicRepetition } from 'features/topUp/pages/PeriodicRepetition'
import { TopUpRoutes } from 'features/topUp/constants/routes'
import { TopUpValue } from 'features/topUp/pages/TopUpValue'
import { CheckDataTopUp } from 'features/topUp/pages/CheckDataTopUp'
import { CompleteTopUp } from 'features/topUp/pages/CompleteTopUp'
import { ActivateCard } from 'features/card/pages/ActivateCard/ActivateCard'
import { ActivateCardConclude } from 'features/card/pages/ActivateCard/ActivateCardConclude'
import { PasswordCard } from 'features/card/pages/ActivateCard/PasswordCard'
import { ConfirmPasswordCard } from 'features/card/pages/ActivateCard/ConfirmPasswordCard'
import { ConfirmationActivate } from 'features/card/pages/ActivateCard/ConfirmationActivate'
import { TaxPaymentHome } from 'features/taxPayment/pages/taxPaymentHome'
import { SmsTransferRoutes } from 'features/smsTransfer/constants/routes'
import { SmsTransferNumber } from 'features/smsTransfer/pages/SmsTransferNumber'
import { SmsTransferValue } from 'features/smsTransfer/pages/SmsTransferValue'
import { SmsTransferSummary } from 'features/smsTransfer/pages/SmsTransferSummary'
import { TransferProcess } from 'features/transference/pages/TransferProcess'
import { SchedulePayments } from 'features/schedulePayments/constants/routes'
import { ScheduleTransactions } from 'features/schedulePayments/pages/ScheduleTransactions'
import { FutureTransactions } from 'features/schedulePayments/pages/FutureTransactions'
import { ScheduleTransactionsList } from 'features/schedulePayments/pages/ScheduleTransactionsList'
import { SheduleTransactionsFilter } from 'features/schedulePayments/pages/SheduleTransactionsFilter'
import { ChangePasswordFirstAccess } from 'features/authentication/pages/FirstAccess/ChangePasswordFirstAccess'
import { ConfirmPasswordFirstAccess } from 'features/authentication/pages/FirstAccess/ConfirmPasswordFirstAccess'
import { ChangePasswordCompleted } from 'features/authentication/pages/FirstAccess/ChangePasswordCompleted'
import { RecoverPassword } from 'features/authentication/pages/ResetPassword/RecoverPassword'
import { SendRecoverPwd } from 'features/authentication/pages/ResetPassword/SendRecoverPwd'
import { ConfirmRecoverPwd } from 'features/authentication/pages/ConfirmRecoverPwd'
import { TemporaryPassword } from 'features/authentication/pages/TemporaryPassword'
import { SmsAccountsExibition } from 'features/smsTransfer/pages/SmsAccountsExibition'
import { SmsTransferName } from 'features/smsTransfer/pages/SmsTransferName'
import { AssociateNameUserCard } from 'features/card/pages/AssociateNewCard/AssociateNameUserCard'
import { AssociateNationalityCard } from 'features/card/pages/AssociateNewCard/AssociateNationalityCard'
import { AssociateMotherNameCard } from 'features/card/pages/AssociateNewCard/AssociateMotherNameCard'
import { AssociateBirthDateCard } from 'features/card/pages/AssociateNewCard/AssociateBirthDateCard'
import { AssociateGenderUserCard } from 'features/card/pages/AssociateNewCard/AssociateGenderUserCard/AssociateGenderUserCard'
import { AssociateMaritalStatusCard } from 'features/card/pages/AssociateNewCard/AssociateMaritalStatusCard/AssociateMaritalStatusCard'
import { ConcludeAssociateCard } from 'features/card/pages/AssociateNewCard/ConcludeAssociateCard'
import { InvalidDataForAssociateCard } from 'features/card/pages/AssociateNewCard/InvalidDataForAssociateCard'
import { ConclusionFlow } from 'components/ConclusionFlow'
import { AdjustLimit } from 'features/pix/pages/AdjustLimit'
import {
  ChangeValue,
  PaymentAttach,
  PaymentData,
  PaymentDescription,
  PaymentHome,
  PaymentReceipt,
  PaymentRoutes,
  PaymentSummary,
  ScanBarcode,
} from 'features/payment'
import { EnterMailForSms } from 'features/onboarding/pages/ActivateBySMS/EnterMailForSms'
import {
  DigitalWithdrawalStart,
  DigitalWithdrawalSuccess,
  DigitalWithdrawalReceipt,
  DigitalWithdrawalRoutes,
  MoneyCount,
  SelectValue,
  ReadQrCodeDigitalWithdrawal,
  DigitalWithdrawalSummary,
} from 'features/digitalWithdrawal'
import { PixRoutes } from 'features/pix/constants/routes'
import {
  PixKeyTransferKeyType,
  PixArea,
  PixFirstAccess,
  QrCodeTransferPix,
  PixTransferMethods,
  PixKeyTransferPayeeInfo,
  PixKeyTransferValue,
  PixKeyTransferMessage,
  CreateEmailKey,
  ConfirmWithDrawal,
  CreatePhoneKey,
  CreateRandomKey,
  CreateTaxIdKey,
  ReceivePixQrCodeValue,
  ReceivePaymentQrCode,
  CheckPixQrCode,
  AdjustNightlyInternal,
  PixChangeReceipt,
  CheckPaymentInfo,
  TransferPayeeName,
  PixTransferValue,
  PixAccountNumber,
  PixSelectBank,
  PixSelectAccountType,
  PixBankBranch,
  Keys,
  PixTransferPayeeTaxId,
  PixKeyTransferSummary,
  PixKeyPaymentReceipt,
  PixTransferCompleted,
  PixTransferSummary,
  PixProcessing,
  PixFirstAccessMyKeys,
  PixFirstAccessWithdrawalChange,
  ConfirmQrCodeTransferValue,
  IncreaseNightlyLimit,
  IncreaseTotalDailyLimit,
  PixPaymentLimit,
  NightlyLimit,
  TotalDailyLimit,
  WithdrawValue,
  PixChangeValue,
  PixChangeSummary,
} from 'features/pix/pages'
import { ConfirmTokenEmailKey } from 'features/pix/pages/ConfirmTokenEmailKey/ConfirmTokenEmailKey.controller'
import { ConfirmTokenPhoneKey } from 'features/pix/pages/ConfirmTokenPhoneKey/ConfirmTokenPhoneKey.controller'
import { WithFirstAccessControl } from 'components/WithFirstAccessControl'
import { QrCodeTransferSummary } from 'features/pix/pages/QrCodeTransferSummary'
import { QrCodeTransferMessage } from 'features/pix/pages/QrCodeTransferMessage'
import { CancelPeriodicRepetition } from 'features/topUp/pages/CancelPeriodicTopUp'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={OnboardingRoutes.welcome} component={Welcome} />
        <Route path={OnboardingRoutes.terms} component={Terms} />
        <Route
          exact
          path={OnboardingRoutes.activateAccount}
          component={ActivateAccount}
        />
        <Route
          path={OnboardingRoutes.activationTokenForSMS}
          component={ActivationToken}
        />
        <Route
          path={OnboardingRoutes.enterTaxPayerForSMS}
          component={EnterTaxPayer}
        />
        <Route
          path={OnboardingRoutes.enterMailForSms}
          component={EnterMailForSms}
        />
        <Route
          path={OnboardingRoutes.createPasswordForSMS}
          component={CreatePassword}
        />
        <Route
          path={OnboardingRoutes.confirmPasswordForSMS}
          component={ConfirmPassword}
        />
        <Route
          path={OnboardingRoutes.accountActivationCompletedForSMS}
          component={AccountActivationCompleted}
        />
        <Route path={OnboardingRoutes.birthDateForSMS} component={BirthDate} />
        <Route
          path={OnboardingRoutes.createNameForSMS}
          component={CreateName}
        />

        <Route
          path={OnboardingRoutes.validatePhoneForSMS}
          component={ValidatePhone}
        />

        <Route path={OnboardingRoutes.accountEmail} component={AccountEmail} />

        <Route
          path={OnboardingRoutes.accountActivationCompletedForCard}
          component={AccountActivationCompletedForCard}
        />
        <Route
          path={OnboardingRoutes.enterTaxPayerForCard}
          component={EnterTaxPayerForCard}
        />
        <Route
          path={OnboardingRoutes.enterIdentifierForCard}
          component={EnterIdentifierForCard}
        />
        <Route
          path={OnboardingRoutes.enterDigitsForCard}
          component={EnterDigitsForCard}
        />
        <Route
          path={OnboardingRoutes.enterPhoneForCard}
          component={EnterPhoneForCard}
        />
        <Route
          path={OnboardingRoutes.createPasswordForCard}
          component={CreatePasswordForCard}
        />
        <Route
          path={OnboardingRoutes.confirmPasswordForCard}
          component={ConfirmPasswordForCard}
        />
        <Route
          path={OnboardingRoutes.invalidDataForCard}
          component={InvalidDataForCard}
        />
        <Route
          path={OnboardingRoutes.enterBirthdayForCard}
          component={EnterBirthDateForCard}
        />
        <Route
          path={AuthenticationRoutes.recoverPassword}
          component={RecoverPassword}
        />
        <Route path={OnboardingRoutes.landingPage} component={LandingPage} />
        <Route
          exact
          path={AuthenticationRoutes.sendRecoverPwd}
          component={SendRecoverPwd}
        />
        <Route
          exact
          path={AuthenticationRoutes.confirmRecoverPwd}
          component={ConfirmRecoverPwd}
        />
        <Route
          exact
          path={QrCodeTransferRoutes.qrCodeTransfer}
          component={QrCodeTransfer}
        />
        <Route
          exact
          path={QrCodeTransferRoutes.generateQrCodeTransfer}
          component={GenerateQrCodeTransfer}
        />
        <Route
          exact
          path={QrCodeTransferRoutes.viewQrCodeTransfer}
          component={ShowQrCodeTransfer}
        />
        <Route
          exact
          path={QrCodeTransferRoutes.readQrCodeTransfer}
          component={ReadQrCodeTransfer}
        />
        <Route
          exact
          path={QrCodeTransferRoutes.sendQrCodeTransfer}
          component={QrCodeTransferSendingDetails}
        />
        <Route
          exact
          path={QrCodeTransferRoutes.completedTransfer}
          component={ConclusionFlow}
        />
        <Route
          exact
          path={SchedulePayments.ScheduleTransactions}
          component={ScheduleTransactions}
        />
        <Route
          exact
          path={SchedulePayments.FutureTransactions}
          component={FutureTransactions}
        />
        <Route
          exact
          path={SchedulePayments.ScheduleTransactionsList}
          component={ScheduleTransactionsList}
        />
        <Route
          exact
          path={SmsTransferRoutes.smsTransferNumber}
          component={SmsTransferNumber}
        />
        <Route
          exact
          path={SmsTransferRoutes.smsTransferValue}
          component={SmsTransferValue}
        />
        <Route
          exact
          path={SchedulePayments.ScheduleTransactionsList}
          component={ScheduleTransactionsList}
        />
        <Route
          exact
          path={SchedulePayments.SheduleTransactionsFilter}
          component={SheduleTransactionsFilter}
        />
        <Route
          exact
          path={SmsTransferRoutes.smsTransferSummary}
          component={SmsTransferSummary}
        />
        <Route
          exact
          path={SmsTransferRoutes.completedSmsTransfer}
          component={ConclusionFlow}
        />
        <Route
          exact
          path={SmsTransferRoutes.SmsAccountsExibition}
          component={SmsAccountsExibition}
        />
        <Route
          exact
          path={SmsTransferRoutes.SmsTransferName}
          component={SmsTransferName}
        />
        <Route
          exact
          path={UserRoutes.home}
          component={UserInformation}
        />
        <Route
          exact
          path={UserRoutes.changeEmail}
          component={ChangeEmail}
        />
        <Route
          exact
          path={UserRoutes.changePhone}
          component={ChangePhone}
        />
        <Route
          exact
          path={UserRoutes.changeChangeNickname}
          component={ChangeNickname}
        />
        <Route
          exact
          path={UserRoutes.changeEmail}
          component={ChangeEmail}
        />
        <Route
          exact
          path={UserRoutes.changePassword}
          component={ChangePassword}
        />
        <Route
          exact
          path={UserRoutes.chooseNewPassword}
          component={ChooseNewPassword}
        />
        <Route
          exact
          path={UserRoutes.confirmNewPassword}
          component={ConfirmNewPasswordUserInformation}
        />
        <Route
          exact
          path={UserRoutes.currentAddress}
          component={CurrentAddress}
        />
        <Route
          exact
          path={UserRoutes.changeAddress}
          component={ChangeAddress}
        />
        <Route
          exact
          path={UserRoutes.changeConclude}
          component={ChangeConclude}
        />
        <Route path={OnboardingRoutes.accountActivationCompletedForCard}>
          <AccountActivationCompletedForCard activeTwoButtons={true} />
        </Route>
        <Route path={AuthenticationRoutes.signIn} component={SignIn} />
        <Route path={AuthenticationRoutes.signOut} component={SignOut} />
        <Route
          path={AuthenticationRoutes.temporaryPassword}
          component={TemporaryPassword}
        />
        <Route
          path={AuthenticationRoutes.changePasswordFirstAccess}
          component={ChangePasswordFirstAccess}
        />
        <Route
          path={AuthenticationRoutes.confirmPasswordFirstAccess}
          component={ConfirmPasswordFirstAccess}
        />
        <Route
          path={AuthenticationRoutes.changePasswordCompleted}
          component={ChangePasswordCompleted}
        />

        <Route
          exact
          path={AccountRoutes.filter}
          component={BankStatementFilter}
        />
        <Route exact path={AccountRoutes.detail} component={Details} />
        <Route exact path={AccountRoutes.home} component={Home} />
        <Route
          exact
          path={AccountRoutes.bankStatement}
          component={BankStatement}
        />
        <Route
          exact
          path={AccountRoutes.settings}
          component={AccountSettings}
        />
        <Route exact path={AccountRoutes.help} component={Help} />
        <Route
          exact
          path={PaymentRoutes.barcodeScanner}
          component={ScanBarcode}
        />
        <Route
          exact
          path={PaymentRoutes.details}
          component={PaymentData}
        />
        <Route
          exact
          path={PaymentRoutes.changeValue}
          component={ChangeValue}
        />
        <Route
          exact
          path={PaymentRoutes.paymentEmptyDescription}
          component={PaymentDescription}
        />
        <Route
          exact
          path={PaymentRoutes.completedPayment}
          component={ConclusionFlow}
        />
        <Route
          exact
          path={PaymentRoutes.paymentReceipt}
          component={PaymentReceipt}
        />
        <Route
          exact
          path={PaymentRoutes.paymentAttach}
          component={PaymentAttach}
        />

        <Route
          exact
          path={PaymentRoutes.summary}
          component={PaymentSummary}
        />
        <Route
          exact
          path={AccountRoutes.allAccounts}
          component={AllAccounts}
        />
        <Route
          exact
          path={AccountRoutes.receipt}
          component={Receipt}
        />
        <Route exact path={AccountRoutes.detail} component={Details} />
        <Route
          exact
          path={AccountRoutes.editAccount}
          component={EditAccount}
        />
        <Route
          exact
          path={PaymentRoutes.barcodePayment}
          component={PaymentHome}
        />
        <Route exact path={AccountRoutes.home} component={Home} />
        <Route
          exact
          path={TransferenceRoutes.favoredIdentification}
          component={FavoredIdentification}
        />
        <Route
          exact
          path={TransferenceRoutes.favoredName}
          component={FavoredName}
        />
        <Route
          exact
          path={TransferenceRoutes.selectBank}
          component={SelectBank}
        />
        <Route
          exact
          path={TransferenceRoutes.selectAccountType}
          component={SelectAccountType}
        />
        <Route
          exact
          path={TransferenceRoutes.bankBranch}
          component={BankBranch}
        />
        <Route
          exact
          path={TransferenceRoutes.accountNumber}
          component={AccountNumber}
        />
        <Route
          exact
          path={TransferenceRoutes.attachDocuments}
          component={AttachDocuments}
        />
        <Route
          exact
          path={TransferenceRoutes.processTransfer}
          component={TransferProcess}
        />
        <Route
          exact
          path={TransferenceRoutes.favoredAccountSelection}
          component={FavoredAccountSelection}
        />
        <Route
          exact
          path={TransferenceRoutes.schedule}
          component={ScheduleTransfer}
        />
        <Route
          exact
          path={TransferenceRoutes.summary}
          component={Summary}
        />
        <Route
          exact
          path={TransferenceRoutes.description}
          component={TransferDescription}
        />
        <Route
          exact
          path={TransferenceRoutes.voucherTransfer}
          component={TransferReceipt}
        />
        <Route
          exact
          path={TransferenceRoutes.value}
          component={TransferValue}
        />
        <Route
          exact
          path={TransferenceRoutes.transference}
          component={Transference}
        />
        <Route
          exact
          path={CardRoutes.cardManagement}
          component={CardManagement}
        />
        <Route
          exact
          path={CardRoutes.cardOption}
          component={CardOption}
        />
        <Route
          exact
          path={CardRoutes.enterCurrentPassword}
          component={EnterCurrentPassword}
        />
        <Route
          exact
          path={CardRoutes.enterNewPassword}
          component={EnterNewPassword}
        />
        <Route
          exact
          path={CardRoutes.confirmNewPassword}
          component={ConfirmNewPassword}
        />
        <Route
          exact
          path={CardRoutes.cancel}
          component={CancellationReplacementCard}
        />
        <Route
          exact
          path={CardRoutes.cancelReason}
          component={CancelReason}
        />
        <Route
          exact
          path={CardRoutes.cancelWarning}
          component={CancelCardAlert}
        />
        <Route
          exact
          path={CardRoutes.reissueReason}
          component={BlockingReason}
        />
        <Route
          exact
          path={CardRoutes.reissueWarning}
          component={BlockCardAlert}
        />
        <Route
          exact
          path={CardRoutes.address}
          component={AddressConfirmation}
        />
        <Route
          exact
          path={CardRoutes.reissueDetails}
          component={ReplacementDetails}
        />
        <Route
          exact
          path={CardRoutes.updateAddress}
          component={UpdateAddress}
        /> 
        <Route
          exact
          path={CardRoutes.associateNewCard}
          component={AssociateNewCard}
        />
        <Route
          exact
          path={CardRoutes.activeFourDigits}
          component={AssociateFourDigits}
        />
        <Route
          path={CardRoutes.invalidDataForCard}
          component={InvalidDataForAssociateCard}
        />
        <Route
          exact
          path={CardRoutes.associateNewCardCheck}
          component={AssociateNewCardCheckData}
        />
        <Route
          exact
          path={CardRoutes.associateMotherNameCard}
          component={AssociateMotherNameCard}
        />
        <Route
          exact
          path={CardRoutes.associateNationalityCard}
          component={AssociateNationalityCard}
        />
        <Route
          exact
          path={CardRoutes.associateNameUserCard}
          component={AssociateNameUserCard}
        />
        <Route
          exact
          path={CardRoutes.associateBirthDateCard}
          component={AssociateBirthDateCard}
        />
        <Route
          exact
          path={CardRoutes.associateGenderUserCard}
          component={AssociateGenderUserCard}
        />
        <Route
          exact
          path={CardRoutes.associateMaritalStatusCard}
          component={AssociateMaritalStatusCard}
        />

        <Route
          exact
          path={CardRoutes.concludeAssociateCard}
          component={ConcludeAssociateCard}
        />

        <Route
          exact
          path={TaxPaymentRoutes.otherPayment}
          component={TaxPaymentHome}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentDarj}
          component={PaymentDarj}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentDarjType}
          component={PaymentDarjType}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentDarjCodeNumber}
          component={PaymentDarjCodeNumber}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentDarjValues}
          component={PaymentDarjValues}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentDarjDueDate}
          component={PaymentDarjDueDate}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentDarjDescription}
          component={PaymentDarjDescription}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentDarjSummary}
          component={PaymentDarjSummary}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentDarjConclude}
          component={ConclusionFlow}
        />

        <Route
          exact
          path={TaxPaymentRoutes.paymentGare}
          component={PaymentGare}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentGareType}
          component={PaymentGareDateType}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentGareCodeNumber}
          component={PaymentGareCodeNumber}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentGareValues}
          component={PaymentGareValues}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentGareDueDate}
          component={PaymentGareDueDate}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentGareDescription}
          component={PaymentGareDescription}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentGareSummary}
          component={PaymentGareSummary}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentGareConclude}
          component={ConclusionFlow}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentFgts}
          component={PaymentFgts}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentFgtsBarCode}
          component={PaymentFgtsBarCode}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentFgtsCodeRevenue}
          component={PaymentFgtsCodeRevenue}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentFgtsValues}
          component={PaymentFgtsValues}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentFgtsIdentifier}
          component={PaymentFgtsIdentifier}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentFgtsDate}
          component={PaymentFgtsDate}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentFgtsDescription}
          component={PaymentFgtsDescription}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentFgtsSummary}
          component={PaymentFgtsSummary}
        />
        <Route
          exact
          path={TaxPaymentRoutes.paymentFgtsConclude}
          component={ConclusionFlow}
        />
        <Route
          exact
          path={TopUpRoutes.topUpSchedule}
          component={TopUpSchedule}
        />
        <Route
          exact
          path={TopUpRoutes.topUpNumber}
          component={TopUpNumber}
        />
        <Route exact path={TopUpRoutes.topUp} component={TopUp} />
        <Route
          exact
          path={TopUpRoutes.periodicRepetition}
          component={PeriodicRepetition}
        />
        <Route
          exact
          path={TopUpRoutes.completeTopUp}
          component={CompleteTopUp}
        />
        <Route
          exact
          path={TopUpRoutes.checkDataTopUp}
          component={CheckDataTopUp}
        />
        <Route
          exact
          path={TopUpRoutes.topUpValue}
          component={TopUpValue}
        />
        <Route
          exact
          path={TopUpRoutes.concludeTopUp}
          component={ConclusionFlow}
        />
        <Route
          exact
          path={CardRoutes.activateCard}
          component={ActivateCard}
        />
        <Route
          exact
          path={CardRoutes.activateCardConclude}
          component={ActivateCardConclude}
        />
        <Route
          exact
          path={CardRoutes.passwordCard}
          component={PasswordCard}
        />
        <Route
          exact
          path={CardRoutes.confirmPasswordCard}
          component={ConfirmPasswordCard}
        />
        <Route
          exact
          path={CardRoutes.confirmationActivate}
          component={ConfirmationActivate}
        />
        <Route
          exact
          path={DigitalWithdrawalRoutes.digitalWithdrawalStart}
          component={DigitalWithdrawalStart}
        />
        <Route
          exact
          path={DigitalWithdrawalRoutes.selectValue}
          component={SelectValue}
        />
        <Route
          path={DigitalWithdrawalRoutes.moneyCount}
          component={MoneyCount}
        />
        <Route
          exact
          path={DigitalWithdrawalRoutes.digitalWithdrawalSuccess}
          component={DigitalWithdrawalSuccess}
        />
        <Route
          exact
          path={DigitalWithdrawalRoutes.digitalWithdrawReceipt}
          component={DigitalWithdrawalReceipt}
        />
        <Route
          exact
          path={DigitalWithdrawalRoutes.digitalWithdrawalSummary}
          component={DigitalWithdrawalSummary}
        />
        <Route
          exact
          path={DigitalWithdrawalRoutes.readQrCodeDigitalWithdrawal}
          component={ReadQrCodeDigitalWithdrawal}
        />

        <Route
          exact
          path={PixRoutes.firstAccess}
          component={PixFirstAccess}
        />

        <Route
          exact
          path={PixRoutes.home}
          component={WithFirstAccessControl(PixArea, PixRoutes.firstAccess)}
        />

        <Route
          exact
          path={PixRoutes.firstAccessWithdrawalChange}
          component={PixFirstAccessWithdrawalChange}
        />
        <Route
          exact
          path={PixRoutes.firstAccessMyKeys}
          component={PixFirstAccessMyKeys}
        />

        <Route
          exact
          path={PixRoutes.transfer}
          component={PixTransferMethods}
        />
        <Route
          exact
          path={PixRoutes.adjustNightlyPeriod}
          component={AdjustNightlyInternal}
        />
        <Route
          exact
          path={PixRoutes.createEmailKey}
          component={CreateEmailKey}
        />
        <Route
          exact
          path={PixRoutes.createEmailKeyConfirmToken}
          component={ConfirmTokenEmailKey}
        />
        <Route
          exact
          path={PixRoutes.qrCodeTransferMessage}
          component={QrCodeTransferMessage}
        />

        <Route
          exact
          path={PixRoutes.pixChangeReceipt}
          component={PixChangeReceipt}
        />
        <Route
          exact
          path={PixRoutes.keyPaymentReceipt}
          component={PixKeyPaymentReceipt}
        />
        <Route
          exact
          path={PixRoutes.transferCompleted}
          component={PixTransferCompleted}
        />
        <Route
          exact
          path={PixRoutes.pixBankBranch}
          component={PixBankBranch}
        />
        <Route
          exact
          path={PixRoutes.createRandomKey}
          component={CreateRandomKey}
        />
        <Route
          exact
          path={PixRoutes.checkPaymentInfo}
          component={CheckPaymentInfo}
        />
        <Route
          exact
          path={PixRoutes.keys}
          component={WithFirstAccessControl(Keys, PixRoutes.firstAccessMyKeys)}
        />
        <Route
          exact
          path={PixRoutes.withdrawSummary}
          component={ConfirmWithDrawal}
        />
        <Route
          exact
          path={PixRoutes.createPhoneKey}
          component={CreatePhoneKey}
        />

        <Route
          exact
          path={PixRoutes.createPhoneKeyConfirmToken}
          component={ConfirmTokenPhoneKey}
        />
        <Route
          exact
          path={PixRoutes.bankDataTransferPayeeName}
          component={TransferPayeeName}
        />
        <Route
          exact
          path={PixRoutes.bankDataTransferPayeeTaxId}
          component={PixTransferPayeeTaxId}
        />
        <Route
          exact
          path={PixRoutes.pixSelectBank}
          component={PixSelectBank}
        />
        <Route
          exact
          path={PixRoutes.pixSelectAccountType}
          component={PixSelectAccountType}
        />
        <Route
          exact
          path={PixRoutes.pixAccountNumber}
          component={PixAccountNumber}
        />
        <Route
          exact
          path={PixRoutes.pixTransferValue}
          component={PixTransferValue}
        />
        <Route
          exact
          path={PixRoutes.createTaxIdKey}
          component={CreateTaxIdKey}
        />
        <Route
          exact
          path={PixRoutes.qrCodeTransfer}
          component={QrCodeTransferPix}
        />
        <Route
          exact
          path={PixRoutes.confirmQrCodeTransferValue}
          component={ConfirmQrCodeTransferValue}
        />
        <Route
          exact
          path={PixRoutes.qrCodeTransferSummary}
          component={QrCodeTransferSummary}
        />
        <Route
          exact
          path={PixRoutes.keyTransfer}
          component={PixKeyTransferKeyType}
        />
        <Route
          exact
          path={PixRoutes.keyTransferPayeeInfo}
          component={PixKeyTransferPayeeInfo}
        />
        <Route
          exact
          path={PixRoutes.keyTransferValue}
          component={PixKeyTransferValue}
        />
        <Route
          exact
          path={PixRoutes.keyTransferSummary}
          component={PixKeyTransferSummary}
        />
        <Route
          exact
          path={PixRoutes.bankTransferSummary}
          component={PixTransferSummary}
        />
        <Route
          exact
          path={PixRoutes.keyTransferMessage}
          component={PixKeyTransferMessage}
        />
        <Route
          exact
          path={PixRoutes.pixProcessing}
          component={PixProcessing}
        />
        <Route
          exact
          path={PixRoutes.receivePixQRCodeValue}
          component={ReceivePixQrCodeValue}
        />
        <Route
          exact
          path={PixRoutes.receivePaymentQRCode}
          component={ReceivePaymentQrCode}
        />
        <Route
          exact
          path={PixRoutes.receivePaymentQRCode}
          component={QrCodeTransferMessage}
        />
        <Route
          exact
          path={PixRoutes.checkPixQRCode}
          component={CheckPixQrCode}
        />
        <Route
          exact
          path={PixRoutes.totalDailyLimit}
          component={TotalDailyLimit}
        />
        <Route
          exact
          path={PixRoutes.pixPaymentLimit}
          component={PixPaymentLimit}
        />
        <Route
          exact
          path={PixRoutes.adjustLimit}
          component={AdjustLimit}
        />
        <Route
          exact
          path={PixRoutes.nightlyLimit}
          component={NightlyLimit}
        />
        <Route
          exact
          path={PixRoutes.increaseTotalDailyLimit}
          component={IncreaseTotalDailyLimit}
        />
        <Route
          exact
          path={PixRoutes.increaseNightlyLimit}
          component={IncreaseNightlyLimit}
        />
        <Route
          exact
          path={PixRoutes.withdrawValue}
          component={WithdrawValue}
        />
        <Route
          exact
          path={PixRoutes.pixChangeValue}
          component={PixChangeValue}
        />
        <Route
          exact
          path={PixRoutes.pixChangeSummary}
          component={PixChangeSummary}
        />
        <Route
          exact
          path={TopUpRoutes.cancelPeriodicTopUp}
          component={CancelPeriodicRepetition}
        />
      </Switch>
    </BrowserRouter>
  )
}
