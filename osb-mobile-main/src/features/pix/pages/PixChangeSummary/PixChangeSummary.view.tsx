import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, concludeLabel } from 'constants/buttons/labels'
import { PixRoutes } from 'features/pix/constants/routes'
import { useStyles } from './PixChangeSummary.style'
import { Box } from '@material-ui/core'
import { CurrencyFormatter } from '_translate'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'

interface PixChangeSummaryViewProps {
  onNextButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
  onAuthorizationClose: (tokenIsValid: boolean) => void
  amountChange?: string
  amountPurchase: number
  amountTransaction: number
  infoToPayer?: string
  description?: string
  clientCompanyName: string
  companyTaxId: string
  loading: boolean
  errorMessage?: string
  openAuthorizationSheet: boolean
}

export const PixChangeSummaryView: React.FC<PixChangeSummaryViewProps> = ({
  onNextButtonClick,
  onCancelButtonClick,
  amountChange,
  amountPurchase,
  amountTransaction,
  infoToPayer,
  description,
  clientCompanyName,
  companyTaxId,
  onAuthorizationClose,
  openAuthorizationSheet,
  errorMessage,
  loading,
}) => {
  const styles = useStyles()

  return (
    <PageContainer className={styles.page}>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={PixRoutes.home}
            action={
              <Button
                palette="secondary"
                size="small"
                startIcon={<Close color="primary" />}
                onClick={onCancelButtonClick}
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Pix Troco"
            subtitle="Hora de conferir"
            description="Confira, cuidadosamente, os dados da sua solicitação."
          />
        }
        main={
          <React.Fragment>
            <Box className={styles.summaryContent}>
              <Box>Valor solicitado em dinheiro</Box>
              <strong>{amountChange}</strong>
              <Box>Valor da compra</Box>
              <strong>{CurrencyFormatter.format(amountPurchase)}</strong>
              <Box>Valor total da transação</Box>
              <strong>{CurrencyFormatter.format(amountTransaction)}</strong>
              <Box>Solicitação ao pagador</Box>
              <strong>{infoToPayer || 'Não informado'}</strong>
              <Box>descrição</Box>
              <strong>{description || 'Não informado'}</strong>
              <Box>Informações adicionais</Box>
              <strong>{clientCompanyName}</strong>
              <Box>CNPJ {companyTaxId}</Box>
            </Box>
          </React.Fragment>
        }
        footer={
          <div className={styles.footer}>
            <ProcessPageFooter
              primaryButton={
                <Button
                  endIcon={<KeyboardArrowRight color="secondary" />}
                  onClick={onNextButtonClick}
                >
                  {concludeLabel}
                </Button>
              }
            />
          </div>
        }
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationClose}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Error" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
