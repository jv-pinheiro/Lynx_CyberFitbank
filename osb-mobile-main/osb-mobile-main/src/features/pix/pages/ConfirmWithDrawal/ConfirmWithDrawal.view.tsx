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
import { useStyles } from './ConfirmWithDrawal.style'
import { Box } from '@material-ui/core'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'

interface ConfirmWithDrawalViewProps {
  onNextButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
  onBackButtonClick: VoidFunction
  onAuthorizationClose: (tokenIsValid: boolean) => void
  amountChange: string
  description?: string
  clientCompanyName?: string
  companyTaxId?: string
  loading: boolean
  errorMessage?: string
  openAuthorizationSheet: boolean
}

export const ConfirmWithDrawalView: React.FC<ConfirmWithDrawalViewProps> = ({
  onNextButtonClick,
  onCancelButtonClick,
  amountChange,
  description,
  clientCompanyName,
  companyTaxId,
  onBackButtonClick,
  loading,
  errorMessage,
  openAuthorizationSheet,
  onAuthorizationClose,
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
            title="Pix Saque"
            subtitle="Hora de conferir"
            description="Confira, cuidadosamente, os dados do saque."
          />
        }
        main={
          <React.Fragment>
            <Box className={styles.summaryContent}>
              <Box>Pix Saque no valor de</Box>
              <strong>{amountChange}</strong>
              <Box>descrição</Box>
              <strong>{description || 'Não informado'}</strong>
              <Box>por meio de</Box>
              <strong>{clientCompanyName}</strong>
              <Box>
                {companyTaxId?.length === 14
                  ? `CPF ${companyTaxId}`
                  : `CNPJ ${companyTaxId}`}
              </Box>
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
              onBackButtonClick={onBackButtonClick}
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
