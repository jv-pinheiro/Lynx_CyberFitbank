import { ApiRequest } from '_config/api';

export interface PixLimitRequest extends ApiRequest {
    TaxId?: string
    CompanyId?: number
    OperationType?: number
    AccountOperationLimitType?: number
    AccountOperationLimitSubType?: number
    MinLimitValue?: number
    MaxLimitValue?: number
}