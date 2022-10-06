import { ApiRequest } from '_config/api'

export interface PixKeysListRequest extends ApiRequest {
  TaxId: string
  Bank?: string
  BankBranch?: string
  BankAccount?: string
  BankAccountDigit?: string
}
