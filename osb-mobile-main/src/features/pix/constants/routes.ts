export enum PixRoutes {
  home = '/pix',
  firstAccess = '/pix/first-access',
  firstAccessWithdrawalChange = '/pix/first-access-withdrawal-change',
  firstAccessMyKeys = '/pix/first-access-my-keys',

  qrCodeTransfer = '/pix/qr-code',
  confirmQrCodeTransferValue = '/pix/confirm-qr-code-transfer-value',
  qrCodeTransferSummary = '/pix/qr-code-transfer-summary',
  receivePixQRCodeValue = '/pix/receive-qr-code-value',
  receivePaymentQRCode = '/pix/receive-payment-qrcode',
  qrCodeTransferMessage = '/pix/qr-code-transfer-message',
  checkPixQRCode = '/pix/check-qrcode',
  helpPixQRCode = 'pix/help-pix-qrcode',

  // rotas de transferência
  transfer = '/pix/transfer',
  keyTransfer = '/pix/transfer/key',
  keyTransferKeyData = '/pix/transfer/key/key-data',
  keyTransferPayeeInfo = '/pix/transfer/key/payee-info',
  keyTransferValue = '/pix/transfer/key/value',
  keyTransferMessage = '/pix/transfer/key/message',
  keyTransferSummary = '/pix/transfer/key/summary',
  bankTransferSummary = '/pix/transfer/bank/summary',
  keyPaymentReceipt = '/pix/transfer/key/receipt',
  bankDataTransfer = '/pix/transfer/bank-data',
  bankDataTransferPayeeName = '/pix/transfer/bank-data/payee-name',
  bankDataTransferPayeeTaxId = '/pix/transfer/bank-data/payee-taxid',
  pixSelectBank = '/pix/transfer/select',
  pixSelectAccountType = '/pix/transfer/account-type',
  pixBankBranch = '/pix/transfer/bank-branch',
  pixAccountNumber = '/pix/transfer/account-number',
  pixTransferValue = '/pix/transfer/value',
  pixTransferDescription = '/pix/transfer-description',
  transferCompleted = '/pix/transfer-completed',
  pixProcessing = '/pix/processing',
  // rotas de chaves
  keys = '/pix/keys',
  createTaxIdKey = '/pix/keys/new/tax-id',
  createEmailKey = '/pix/keys/new/email',
  createEmailKeyConfirmToken = '/pix/keys/new/email/token',
  createPhoneKey = '/pix/keys/new/phone',
  createPhoneKeyConfirmToken = '/pix/keys/new/phone/token',
  createRandomKey = '/pix/keys/new/random',
  createRandomKeyCopyKey = '/pix/keys/new/random/copy',
  // rotas de limites
  pixPaymentLimit = '/pix/limits/pix-payment-limit',
  limits = '/pix/limits',
  totalDailyLimit = '/pix/limits/daily-limit',
  increaseTotalDailyLimit = '/pix/limits/increase-daily-limit',
  nightlyLimit = '/pix/limits/nightly',
  increaseNightlyLimit = '/pix/limits/increase-night-limit',
  raiseNightlyValueLimit = '/pix/limits/nightly/value/raise',
  adjustLimit = '/pix/limits/adjustLimit',
  adjustNightlyPeriod = '/pix/limits/nightly/period',
  pixChangeOrWithdrawalLimit = '/pix/limits/pix-change-or-withdrawal/',

  // rotas da saque
  withdrawValue = '/pix/withdraw',
  withdrawSummary = '/pix/withdraw/summary',
  withdrawReceipt = '/pix/withdraw/receipt',
  // rotas de troco
  pixChangeValue = '/pix/change',
  pixChangeSummary = '/pix/change/summary',
  pixChangeReceipt = '/pix/change/receipt',
  // rotas de devolução
  return = '/pix/return',
  returnMessage = '/pix/return/message',
  returnSummary = '/pix/return/summary',
  returnReceipt = '/pix/return/receipt',
  // rotas de cobrança
  charge = '/pix/charge',
  fixedValueCharge = '/pix/charge/fixed-value',
  fixedValueChargeSummary = '/pix/charge/fixed-value/summary',
  //informação de pagamento
  checkPaymentInfo = '/pix/check-payment-info',
}
