import { AccountOperationLimitType } from 'features/account/redux/models/accountOperationLimitType'
import { AccountOperationLimitSubType } from 'features/account/redux/models/accountOperationLimitSubType'
import { OperationType } from 'features/account/redux/models/operationType'
import { ApiRequest } from '_config'

export interface GetAccountOperationLimit extends ApiRequest {
  TaxId: string
  Bank: string
  BankBranch: string
  BankAccount: string
  BankAccountDigit: string
  OperationType: OperationType
  AccountOperationLimitType?: AccountOperationLimitType
  AccountOperationLimitSubType?: AccountOperationLimitSubType
}
