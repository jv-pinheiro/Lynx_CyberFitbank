import { ApiRequest } from '_config/api'

export interface CreatePixOutRequest extends ApiRequest {
  toName: string
  toTaxId: string
  toBank: string
  toBankBranch: string
  toBankAccount: string
  toBankAccountDigit: string
  value: number
  paymentDate: string
  tags?: string[]
  description?: string
  customerMessage?: string
  pixKey: string
  pixKeyType?: number
}
