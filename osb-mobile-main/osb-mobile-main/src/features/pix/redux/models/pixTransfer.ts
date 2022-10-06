import { KeyType } from 'features/pix'
import { AccountPixType } from './enum'

export interface PixTransfer {
  taxId?: string
  bank?: string
  bankName?: string
  bankBranch?: string
  bankAccount?: string
  bankAccountDigit?: string
  toName?: string
  toTaxId?: string
  toBank?: string
  toBankBranch?: string
  toBankAccount?: string
  toBankAccountDigit?: string
  value?: number
  paymentDate?: Date
  rateValue?: number
  rateValueType?: number
  tags?: string[]
  description?: string
  onlineTransfer?: boolean
  searchProtocol?: number
  customerMessage?: string
  pixKey?: string
  pixKeyType?: KeyType
  accountType?: AccountPixType
}
