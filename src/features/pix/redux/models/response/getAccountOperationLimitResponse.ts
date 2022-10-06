export interface GetAccountOperationLimitResponse {
  accountHolder?: string
  accountHolderTaxNumber: string
  operationType?: number
  type?: number
  subType?: number
  minValue: number
  maxValue: number
}
