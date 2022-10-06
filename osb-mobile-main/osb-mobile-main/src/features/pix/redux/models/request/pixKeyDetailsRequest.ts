import { ApiRequest } from '_config'

export interface PixKeyDetailsRequest extends ApiRequest {
  pixKey?: string
  PixKeyType?: number
  TaxNumber?: string
}
