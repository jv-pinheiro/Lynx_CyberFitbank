import { GetAccountOperationLimitResponse } from './response/getAccountOperationLimitResponse'

export interface OperationLimits {
  daily?: GetAccountOperationLimitResponse
  overNight?: GetAccountOperationLimitResponse
  singleTransaction?: GetAccountOperationLimitResponse
  limitDaily?: number
  limitOverNight?: number
  limitSingleTransaction?: number
}
