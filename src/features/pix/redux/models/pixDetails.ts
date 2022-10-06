import { AccountPixType } from './enum'

export interface PixDetails {
  payeeName?: string
  payeeBank?: string
  payeeBankBranch?: string
  payeeBankAccount?: string
  payeeAccountType?: AccountPixType
  pixKeyType?: number
  pixKeyValue?: string
  payeeTaxNumber?: string
}
