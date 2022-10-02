import { ApiRequest } from "_config/api";

export interface ConfirmPixKeyHoldRequest extends ApiRequest {
  pixKey: string;
  pixKeyType: number;
  confirmationCode: string;
  taxId: string;
}
