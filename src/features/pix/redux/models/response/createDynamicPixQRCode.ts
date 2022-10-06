import { ChangeType } from '../response/enum'
import { PixAddress } from '../response/PixAddress'

export interface CreateDynamicPixQRCode {
  pixKey: string
  taxId: string
  payerTaxId: string
  payerName: string
  value: number
  address: PixAddress
  changeType: ChangeType
}
