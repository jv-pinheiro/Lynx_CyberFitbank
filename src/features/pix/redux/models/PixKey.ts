import { PixKeyStatus } from './pixKeyStatus'

export interface PixKeys {
  pixKeyValue?: string
  pixKeyType?: number
  status?: PixKeyStatus
  bank?: string
  bankBranch?: string
  bankAccount?: string
  bankAccountDigit?: string
}
