import { ApiRequest } from '_config'
import { PixKeyType } from '../pixKeyType'
import { PixTransactionPurpose } from '../response/enum'
import { PixAddress } from '../response/PixAddress'

export interface GenerateStaticPixQRCodeRequest extends ApiRequest {
  pixKey: string
  principalValue?: number
  address?: PixAddress
  pixTransactionPurpose?: PixTransactionPurpose
  additionalData?: string
  pixKeyType: PixKeyType
}
