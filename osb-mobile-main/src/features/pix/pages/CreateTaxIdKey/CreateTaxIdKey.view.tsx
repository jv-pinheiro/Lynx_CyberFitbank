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
import { TextField } from 'components/TextField'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './CreateTaxIdKey.style'
import { ProcessPageFooterButton } from 'components'
import { CheckDate } from 'features/pix/components/CheckDate/CheckDate'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { AlertConcluded } from 'components/AlertConcluded'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'

interface CreateTaxIdKeyViewProps {
  onDefineClick: VoidFunction
  onCancelButtonClick: VoidFunction
  openAuthorizationSheet: boolean
  onAlertClose: VoidFunction
  onAuthorizationSheetClose: (event: any) => void
  onTaxIdChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  name: string
  bank: string
  errorMessage?: string
  loading: boolean
  onShowAlert: boolean
  onCloseAlert: VoidFunction
  onClickAlert: VoidFunction
}
export const CreateTaxIdKeyView: React.FC<CreateTaxIdKeyViewProps> = ({
  onDefineClick,
  onCancelButtonClick,
  onTaxIdChange,
  openAuthorizationSheet,
  onAuthorizationSheetClose,
  value,
  name,
  bank,
  errorMessage,
  onAlertClose,
  loading,
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
            subtitle="Registrar seu CPF/CNPJ como chave Pix"
            description="Informe o CPF ou CNPJ "
          />
        }
        main={
          <Box
            component="form"
            onSubmit={onDefineClick}
            className={styles.taxIdInput}
          >
            <TextField
              label="CPF ou CNPJ"
              placeholder="Digite apenas números"
              inputMode="numeric"
              value={value}
              onChange={onTaxIdChange}
            />
            <Typography variant="subtitle1" className={styles.importantWarning}>
              Aviso importante:
            </Typography>
            <Typography className={styles.textAlert}>
              Mesmo usando essa chave para realizar uma Transferência para você,
              será possível ver as seguintes informações
            </Typography>
            <Box>
              <CheckDate name={name} bank={bank} taxId={value} />
            </Box>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <ProcessPageFooterButton
                primary
                disabled={!(value.length === 14 || value.length === 18)}
                endIcon={<KeyboardArrowRight />}
                onClick={onDefineClick}
              >
                {nextLabel}
              </ProcessPageFooterButton>
            }
          />
        }
      />
      <Loader open={loading} />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationSheetClose}
      />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onAlertClose}
        />
      )}
      <AlertConcluded
        open={onShowAlert}
        onClose={onCloseAlert}
        onClick={onClickAlert}
        title={'Chave Cadastrada'}
      />
    </PageContainer>
  )
}
