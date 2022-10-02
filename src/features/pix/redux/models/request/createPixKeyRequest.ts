import { ApiRequest } from "_config/api";

export interface CreatePixKeyRequest extends ApiRequest {
  pixKey?: string;
  pixKeyType: number;
  taxId: string;
  SPBBank: string;
  SPBBankBranch: string;
  SPBBankAccount: string;
  SPBBankAccountDigit: string;
}
