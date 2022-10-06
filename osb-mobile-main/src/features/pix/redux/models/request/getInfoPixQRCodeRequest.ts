import { ApiRequest } from "_config";

export interface GetInfoPixQRCodeRequest extends ApiRequest{
  taxId: string;
  hash: string;
}