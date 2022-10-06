export enum AccountRoutes {
  home = '/account',
  bankStatement = '/account/bank-statement', // Ok
  settings = '/account/settings', // Error
  detail = '/account/details', // Error
  help = '/account/help', // Ok, mas bom olhar desing
  filter = '/account/bank-statement/filter', // Ok
  allAccounts = '/account/all-accounts', // Error
  receipt = '/account/receipt', // Ok
  editAccount = '/account/edit-account', // Ok, mas bom olhar desing
}
