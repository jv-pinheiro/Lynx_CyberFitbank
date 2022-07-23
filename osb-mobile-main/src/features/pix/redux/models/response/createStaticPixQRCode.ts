import { PixTransactionPurpose } from '../response/enum'
import { PixAddress } from '../response/PixAddress'

export interface CreateStaticPixQRCode {
  pixKey: string
  value: number
  address: PixAddress
  pixTransactionPurpose: PixTransactionPurpose
}
