export enum OnboardingRoutes {
  welcome = '/',
  terms = '/terms',
  landingPage = '/landingPage',
  activateAccount = '/onboarding/activate-account',
  accountEmail = '/onboarding/active-account/sms/email',

  activationTokenForSMS = '/onboarding/activate-account/sms/activate-token',
  enterTaxPayerForSMS = '/onboarding/activate-account/sms/enter-taxpayer',
  enterMailForSms = '/onboarding/activate-account/sms/enter-email',
  createPasswordForSMS = '/onboarding/activate-account/sms/create-password',
  confirmPasswordForSMS = '/onboarding/activate-account/sms/confirm-password',
  validatePhoneForSMS = '/onboarding/activate-account/sms/validate-phone',
  accountActivationCompletedForSMS = '/onboarding/activate-account/sms/account-activated',
  birthDateForSMS = '/onboarding/activate-account/sms/birth-date',
  createNameForSMS = '/onboarding/activate-account/sms/create-name',

  enterIdentifierForCard = '/onboarding/activate-account/card/enter-identifier',
  enterDigitsForCard = '/onboarding/activate-account/card/enter-digits',
  enterMailForCard = '/onboarding/activate-account/card/enter-email',
  enterNameForCard = '/onboarding/activate-account/card/enter-name',
  enterTaxPayerForCard = '/onboarding/activate-account/card/enter-taxpayer',
  enterPhoneForCard = '/onboarding/activate-account/card/enter-phone',
  createPasswordForCard = '/onboarding/activate-account/card/create-password',
  confirmPasswordForCard = '/onboarding/activate-account/card/confirm-password',
  enterBirthdayForCard = '/onboarding/activate-account/card/enter-birthday',
  invalidDataForCard = '/onboarding/activate-account/card/invalid-data',
  accountActivationCompletedForCard = '/onboarding/activate-account/card/account-activated',
}