export enum CardRoutes {
  activateCard = '/card/activateCard', //Verificar o Erro
  activateCardConclude = '/card/activateCardConclude', // Verificar se precisa trocar a imagem
  confirmationActivate = '/card/confirmationActivate', // Imagem
  passwordCard = '/card/passwordCard', //Verificar o Erro
  confirmPasswordCard = '/card/confirmPasswordCard',
  cardManagement = '/card',
  cardOption = '/card/details',

  enterCurrentPassword = '/card/change-password/current',
  enterNewPassword = '/card/change-password/new',
  confirmNewPassword = '/card/change-password/confirm',
  validationTokenPassword = '/card/change-password/validate',

  cancel = '/card/cancel',
  cancelReason = '/card/cancel/reason',
  cancelWarning = '/card/cancel/warning',

  reissue = '/card/reissue',
  reissueWarning = '/card/reissue/warning',
  reissueReason = '/card/reissue/reason',
  address = '/card/reissue/address',
  reissueDetails = '/card/reissue/replacement-details',
  updateAddress = '/card/reissue/update-address',

  associateNewCard = '/card/associate',
  invalidDataForCard = '/card/associate/invalid-data',
  activeFourDigits = '/card/associate/active-digits',
  associateNewCardCheck = '/card/associate/check-data',
  validationTokenPasswordAssociate = '/card/associate/validate-password',
  enterNewPasswordAssociate = '/card/associate/new-password',
  confirmNewPasswordAssociate = '/card/associate/confirm-password',
  associateNameUserCard = '/card/associate/name-user-card',
  associateNationalityCard = '/card/associate/nationality-card',
  associateMotherNameCard = '/card/associate/mother-name-card',
  associateBirthDateCard = '/card/associate/associate-birth-date-card',
  associateGenderUserCard = '/card/associate/gender-user-card',
  associateMaritalStatusCard = '/card/associate/associate-marital-status-card',
  concludeAssociateCard = '/card/associate/associate-conclude',
}
