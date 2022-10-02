import { AccountPixType } from '../enum'
import { KeyType } from 'features/pix'

export interface PixKeysDetails {
  payeeName?: string
  payeeBank?: string
  payeeBankBranch?: string
  payeeBankAccount?: string
  payeeBankAccountDigit?: string
  payeeAccountType?: AccountPixType
  pixKeyType?: KeyType
  pixKeyValue?: string
  payeeTaxNumber?: string
}
