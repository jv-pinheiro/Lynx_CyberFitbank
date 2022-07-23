import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Box, Typography } from '@material-ui/core'
import { ProcessPageFooterButton } from 'components'
import { CheckDate } from 'features/pix/components/CheckDate/CheckDate'
import { useStyles } from './CreateRandomKey.styles'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { AlertConcluded } from 'components/AlertConcluded'

interface CreateRandomKeyViewProps {
  onDefineClick: VoidFunction
  onCancelButtonClick: VoidFunction
  openAuthorizationSheet: boolean
  onAlertClose: VoidFunction
  onAuthorizationSheetClose: (event: any) => void
  errorMessage?: string
  loading: boolean
  onShowAlert: boolean
  onCloseAlert: VoidFunction
  onClickAlert: VoidFunction
  name: string
  bank: string
  taxId: string
}
export const CreateRandomKeyView: React.FC<CreateRandomKeyViewProps> = ({
  onDefineClick,
  onCancelButtonClick,
  openAuthorizationSheet,
  onAuthorizationSheetClose,
  onAlertClose,
  loading,
  errorMessage,
  name,
  bank,
  taxId,
  onShowAlert,
  onCloseAlert,
  onClickAlert,
}) => {
  const styles = useStyles()

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
            title="Registrar Chave Pix"
            subtitle="Registrar chave aleatória"
            description="Com a chave aleatória, você gera um QR code para receber sem precisar compartilhar seus dados "
          />
        }
        main={
          <Box component="form" onSubmit={onDefineClick}>
            <Typography variant="subtitle1" className={styles.importantWarning}>
              <strong>Aviso importante</strong>
            </Typography>
            <Typography className={styles.txtalert}>
              Quem usa Pix pode saber que você tem uma chave cadastrada por
              telefone ou e-mail, mas sem ter acesso aos seus dados. Ao te
              pagar, a pessoa verá seu nome completo e alguns dígitos do seu CPF
            </Typography>
            <Box>
              <CheckDate name={name} bank={bank} taxId={taxId}></CheckDate>
            </Box>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <ProcessPageFooterButton
                primary
                endIcon={<KeyboardArrowRight />}
                onClick={onDefineClick}
              >
                {nextLabel}
              </ProcessPageFooterButton>
            }
          />
        }
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationSheetClose}
      />
      <AlertConcluded
        open={onShowAlert}
        onClose={onCloseAlert}
        onClick={onClickAlert}
        title={'Chave Cadastrada'}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onAlertClose}
        />
      )}
    </PageContainer>
  )
}
