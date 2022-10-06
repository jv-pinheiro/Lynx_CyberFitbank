import { CurrencyFormatter, DateFormatter } from '_translate'
import { maskTaxId } from '_utils/masks/taxId'
import React from 'react'
import { useStyles } from 'components/LabelWithValue/LabelWithValue.style'
import { useMask } from 'hooks/useMask'
interface LabelWithValueBankProps {
  name?: string
  datePix?: Date
  taxId?: string
  totalValue: number
  description: string
}
export const LabelWithValueBank: React.FC<LabelWithValueBankProps> = ({
  name,
  datePix,
  taxId,
  totalValue,
  description,
}: LabelWithValueBankProps) => {
  const styles = useStyles()
  const [maskedTaxId, setMaskedTaxId] = useMask(maskTaxId)

  React.useEffect(() => {
    if (taxId) setMaskedTaxId(taxId)
  }, [taxId, setMaskedTaxId])

  return (
    <div className={styles.summaryContent}>
      <div>Transferência PIX no valor de</div>
      <strong>{CurrencyFormatter.format(totalValue)}</strong>
      <div>Para a conta de</div>
      <strong>{name}</strong>
      <div> CPF / CNPJ </div>
      <strong> {taxId ? maskedTaxId : '---'} </strong>
      <div>no dia</div>
      <strong>{DateFormatter.format(datePix)}</strong>
      <div>sua descrição foi</div>
      <strong>{description}</strong>
    </div>
  )
}
