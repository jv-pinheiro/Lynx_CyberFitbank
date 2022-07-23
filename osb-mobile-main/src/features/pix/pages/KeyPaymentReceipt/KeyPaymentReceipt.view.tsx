import React from 'react'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { closeLabel, saveLabel, shareLabel } from 'constants/buttons/labels'
import { Close } from '@material-ui/icons'
import { useStyles } from './KeyPaymentReceipt.style'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Box } from '@material-ui/core'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { TransactionSummary } from 'components/TransactionSummary'
import { LabelWithValueKeyPix } from 'components/LabelWithValueKeyPix'

interface KeyPaymentReceiptViewProps {
  onCloseButtonClick: VoidFunction
  value?: number
  name?: string
  keyType?: string
  taxId?: string
  date?: Date
  description?: string
  pixKey?: string
}

export const KeyPaymentReceiptView: React.FC<KeyPaymentReceiptViewProps> = ({
  onCloseButtonClick,
  value,
  name,
  keyType,
  taxId,
  date,
  description,
  pixKey,
}) => {
  const styles = useStyles()

  return (
    <PageContainer>
      <Box className={styles.wrapper}>
        <ProcessPageLayout
          appBar={
            <AppBar
              homeRoute="#"
              action={
                <Button
                  palette="secondary"
                  size="small"
                  startIcon={<Close color="inherit" />}
                  onClick={onCloseButtonClick}
                >
                  {closeLabel}
                </Button>
              }
            />
          }
          header={
            <Box className={styles.header}>
              <ProcessDescriptionHeader title="Comprovante" />
            </Box>
          }
          main={
            <React.Fragment>
              <Box>
                <LabelWithValueKeyPix
                  name={name}
                  totalValue={value!}
                  taxPayer={taxId}
                  keyPix={`${keyType}: ${pixKey}`}
                  datePix={date}
                  description={description!}
                />
              </Box>
              <Box className={styles.separator}>
                <TransactionSummary
                  idTransaction="000000000000000000"
                  internalProtocol="44B8-439324C-2398721320AB"
                />
              </Box>
            </React.Fragment>
          }
          footer={
            <Box className={styles.buttons}>
              <ButtonWithFloatingIcon size="large">
                {saveLabel}
              </ButtonWithFloatingIcon>
              <ButtonWithFloatingIcon size="large">
                {shareLabel}
              </ButtonWithFloatingIcon>
            </Box>
          }
        />
      </Box>
    </PageContainer>
  )
}
