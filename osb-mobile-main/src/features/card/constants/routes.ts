export enum CardRoutes {
  activateCard = '/card/activateCard', //Verificar o Erro
  activateCardConclude = '/card/activateCardConclude', // Verificar se precisa trocar a imagem
  confirmationActivate = '/card/confirmationActivate', // Imagem
  passwordCard = '/card/passwordCard', //Verificar o Erro
  confirmPasswordCard = '/card/confirmPasswordCard', //Verificar o Erro
  cardManagement = '/card', //Ajeitar Localização do Botão
  cardOption = '/card/details', // Olhar para onde vai o Bloqueio Temporario

  enterCurrentPassword = '/card/change-password/current', // Entender o botão cancelar comentado
  enterNewPassword = '/card/change-password/new',  // Entender o botão cancelar comentado
  confirmNewPassword = '/card/change-password/confirm', // Verificar Erro, provalmente pela falta de dados
  validationTokenPassword = '/card/change-password/validate', // Não Possui tela, ou não está rodando?

  cancel = '/card/cancel', // No geral OK, mas olhar se precisa de outro botão
  cancelReason = '/card/cancel/reason', //Tela OK, porém é interessante rever, talvez precisa de um Desing
  cancelWarning = '/card/cancel/warning', // Verificar Erro, provalmente pela falta de dados

  reissue = '/card/reissue', // Não Possui tela, ou não está rodando?
  reissueWarning = '/card/reissue/warning', // Encontrar a Tela
  reissueReason = '/card/reissue/reason', // Encontrar a Tela
  address = '/card/reissue/address', // Encontrar a Tela
  reissueDetails = '/card/reissue/replacement-details', // Encontrar a Tela
  updateAddress = '/card/reissue/update-address', // Encontrar a Tela

  associateNewCard = '/card/associate', // Tela Ok, o App Bar será corrigido na correção do App Bar
  invalidDataForCard = '/card/associate/invalid-data', // //Tela OK, porém é interessante rever, talvez precisa de um Desing
  activeFourDigits = '/card/associate/active-digits', // Tela OK, o  App Bar será corrigido na correção do App Bar
  associateNewCardCheck = '/card/associate/check-data', // Verificar Erro, provalmente pela falta de dados
  validationTokenPasswordAssociate = '/card/associate/validate-password', // Não Possui tela, ou não está rodando?
  enterNewPasswordAssociate = '/card/associate/new-password', // Tela OK, o  App Bar será corrigido na correção do App Bar
  confirmNewPasswordAssociate = '/card/associate/confirm-password', // Não Possui tela, ou não está rodando?
  associateNameUserCard = '/card/associate/name-user-card', //Tela OK, o  App Bar será corrigido na correção do App Bar
  associateNationalityCard = '/card/associate/nationality-card', //Tela OK, o  App Bar será corrigido na correção do App Bar
  associateMotherNameCard = '/card/associate/mother-name-card', //Tela OK, o  App Bar será corrigido na correção do App Bar
  associateBirthDateCard = '/card/associate/associate-birth-date-card', //Tela Razoalvel, seria bom rever algumas coisas do Desing
  associateGenderUserCard = '/card/associate/gender-user-card', //Tela Razoalvel, seria bom rever algumas coisas do Desing
  associateMaritalStatusCard = '/card/associate/associate-marital-status-card', //Tela Razoalvel, seria bom rever algumas coisas do Desing
  concludeAssociateCard = '/card/associate/associate-conclude', //Tela Razoalvel, seria bom rever algumas coisas do Desing
}
