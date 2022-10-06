import { CurrencyFormatter, DateFormatter } from '_translate'
import React from 'react'
import { useStyles } from 'components/LabelWithValueKeyPix/LabelWithValueKeyPix.style'

interface LabelWithValueKeyPixProps {
  name?: string
  taxPayer?: string
  datePix?: Date
  keyPix?: string
  totalValue: number
  description: string
}

export const LabelWithValueKeyPix: React.FC<LabelWithValueKeyPixProps> = ({
  name,
  taxPayer,
  datePix,
  keyPix,
  totalValue,
  description,
}: LabelWithValueKeyPixProps) => {
  const styles = useStyles()
  return (
    <div className={styles.summaryContent}>
      <div>PIX no valor de</div>
      <strong>{CurrencyFormatter.format(totalValue)}</strong>
      <div>Para a conta de</div>
      <strong>{name}</strong>
      <div>CPF</div>
      <strong>{taxPayer}</strong>
      <div>Chave PIX</div>
      <strong>{keyPix}</strong>
      <div>no dia</div>
      <strong>{DateFormatter.format(datePix)}</strong>
      <div>descrição da transferência</div>
      <strong>{description}</strong>
    </div>
  )
}
