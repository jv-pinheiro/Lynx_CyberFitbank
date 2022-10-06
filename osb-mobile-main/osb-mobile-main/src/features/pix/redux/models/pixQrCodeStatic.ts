import { ChangeType, PixTransactionPurpose } from './response/enum'
import { PixAddress } from './response/PixAddress'

export interface Pix {
  pixKey?: string
  principalValue?: number
  address?: PixAddress
  pixTransactionPurpose?: PixTransactionPurpose
  additionalData?: string
  taxId?: string
  payerTaxId?: string
  payerName?: string
  changeType?: ChangeType
}
