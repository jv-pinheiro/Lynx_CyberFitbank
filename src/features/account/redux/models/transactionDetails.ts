export interface TransactionDetails {
  value: number
  toName: string
  toTaxId: string
  date?: Date
  dueDate?: Date
  description?: string
  tags?: string[]
  externalIdentifier: string
}
