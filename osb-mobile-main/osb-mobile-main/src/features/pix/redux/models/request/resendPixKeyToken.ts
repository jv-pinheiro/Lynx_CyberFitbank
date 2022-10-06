import { ApiRequest } from '_config/api'

export interface ResendPixKeyToken extends ApiRequest {
  pixKey?: string
  pixKeyType: number
  taxId: string
}
