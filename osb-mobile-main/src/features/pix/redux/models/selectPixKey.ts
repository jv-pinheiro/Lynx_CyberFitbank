import { AccountPixType } from './enum'
import { PixKeyStatus } from './pixKeyStatus'

export interface SelectPixKey {
  payeeName?: string
  payeeBank?: string
  payeeBankBranch?: string
  payeeBankAccount?: string
  payeeAccountType?: AccountPixType
  pixKeyType?: number
  pixKeyValue?: string
  payeeTaxNumber?: string
  status?: PixKeyStatus
  pixTransactionPurpose?: number
}
