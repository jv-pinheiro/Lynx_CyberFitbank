import { ApiRequest } from '_config'

export interface ChangeAccountOperationLimitRequest extends ApiRequest {
  TaxId: string
  CompanyId: number
  OperationType?: number
  AccountOperationLimitType?: number
  AccountOperationLimitSubType?: number
  MinLimitValue: number
  MaxLimitValue: number
  Bank?: string
  BankBranch?: string
  BankAccount?: string
  BankAccountDigit?: string
}
