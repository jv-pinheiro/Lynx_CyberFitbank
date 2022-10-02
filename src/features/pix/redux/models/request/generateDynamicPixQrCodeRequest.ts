import { ApiRequest } from '_config'
import { ChangeType } from '../response/enum'
import { PixAddress } from '../response/PixAddress'

export interface GenerateDynamicPixQRCodeRequest extends ApiRequest {
  pixKey: string
  taxId: string
  payerTaxId: string
  payerName: string
  value: number
  address: PixAddress
  changeType: ChangeType
}
