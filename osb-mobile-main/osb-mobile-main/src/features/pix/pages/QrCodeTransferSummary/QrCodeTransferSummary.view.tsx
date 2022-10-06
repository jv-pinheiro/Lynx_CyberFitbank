import { Box } from '@material-ui/core'
import {
  Close,
  KeyboardArrowRight,
  KeyboardArrowLeft,
} from '@material-ui/icons'
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooter,
  ProcessPageFooterButton,
  ProcessPageLayout,
} from 'components'
import { Alert } from 'components/Alert'
import { AlertConcluded } from 'components/AlertConcluded'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { LabelWithValueBank } from 'components/LabelWithValueBank'
import { Loader } from 'components/Loader'
import {
  cancelLabel,
  concludeLabel,
  returnLabel,
} from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import React from 'react'
import { useStyles } from './QrCodeTransferSummary.style'

interface QrCodeTransferSummaryViewProps {
  onSubmit: VoidFunction
  onCancelButtonClick: VoidFunction
  value: number
  date: Date
  openAuthorizationSheet: any
  onAuthorizationClose: Function
  errorMessage?: string
  loading: boolean
  name?: string
  taxId?: string
  description?: string
  open: boolean
  onClose: (args: boolean) => void
  onClick: VoidFunction
  onBackButtonClick: VoidFunction
}

export const QrCodeTransferSummaryView: React.FC<
  QrCodeTransferSummaryViewProps
> = ({
  onSubmit,
  onCancelButtonClick,
  value,
  date,
  openAuthorizationSheet,
  onAuthorizationClose,
  errorMessage,
  loading,
  name,
  description,
  taxId,
  open,
  onClose,
  onClick,
  onBackButtonClick,
}) => {
  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={AccountRoutes.home}
            action={
              <Button
                palette="secondary"
                size="small"
                startIcon={<Close color="inherit" />}
                onClick={onCancelButtonClick}
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Transferência com Pix"
            subtitle="Hora de conferir"
            description="Confira, cuidadosamente, os dados da transferência."
          />
        }
        main={
          <React.Fragment>
            <Box>
              <LabelWithValueBank
                name={name}
                totalValue={value}
                taxId={taxId}
                datePix={date}
                description={description!}
              />
            </Box>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <ProcessPageFooterButton
                primary
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
              >
                {concludeLabel}
              </ProcessPageFooterButton>
            }
            secondaryButton={
              <Button
                palette="secondary"
                startIcon={<KeyboardArrowLeft color="secondary" />}
                onClick={onBackButtonClick}
              >
                {returnLabel}
              </Button>
            }
          />
        }
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationClose}
      />
      <AlertConcluded
        open={open}
        onClose={onClose}
        onClick={onClick}
        title={'Concluído'}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Error" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
