import { ApiRequest } from '_config/api'

import { KeyType } from 'features/pix'
export interface CreatePixTransferRequest extends ApiRequest {
  toName?: string
  toTaxId?: string
  toBank?: string
  toBankBranch?: string
  toBankAccount?: string
  toBankAccountDigit?: string
  value?: number
  paymentDate?: Date
  tags?: string[]
  description?: string
  customerMessage?: string
  pixKey?: string
  pixKeyType?: KeyType
  accountType?: number
}
