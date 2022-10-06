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
import { ProcessPageFooterButton } from 'components'
import { CheckDate } from 'features/pix/components/CheckDate/CheckDate'
import { useStyles } from './CreateEmailKey.styles'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'

interface CreateEmailKeyViewProps {
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDefineClick: VoidFunction
  onCancelButtonClick: VoidFunction
  onAlertClose: VoidFunction
  value: string
  name: string
  bank: string
  taxId: string
  validateError: VoidFunction
  error: boolean
  errorMessage?: string
  loading: boolean
  onShowAlert: boolean
  onCloseAlert: VoidFunction
  onClickAlert: VoidFunction
}
export const CreateEmailKeyView: React.FC<CreateEmailKeyViewProps> = ({
  onDefineClick,
  onCancelButtonClick,
  onEmailChange,
  value,
  name,
  bank,
  taxId,
  validateError,
  error,
  errorMessage,
  loading,
  onAlertClose,
  onShowAlert,
  onClickAlert,
}) => {
  const styles = useStyles()

  React.useEffect(() => {
    validateError()
  }, [value])

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
            subtitle="Registrar seu E-mail como chave Pix"
            description="Você receberá um código via E-mail para confirmar a solicitação"
          />
        }
        main={
          <Box
            component="form"
            onSubmit={onDefineClick}
            className={styles.emailInput}
          >
            <TextField
              label="Email"
              placeholder="seuemail@email.com"
              inputMode="email"
              value={value}
              onChange={onEmailChange}
              error={value ? error : false}
              variant="outlined"
            />
            {value.length > 0 && error && (
              <span className={styles.inputError}>E-mail inválido</span>
            )}
            <Typography variant="subtitle1" className={styles.importantWarning}>
              <strong>Aviso importante</strong>
            </Typography>
            <Typography className={styles.txtalert}>
              Mesmo usando essa chave para realizar uma Transferência para você,
              será possível ver as seguintes informações:
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
                disabled={!value}
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

      {errorMessage && (
        <Alert
          title="Error"
          message={errorMessage}
          severity={'error'}
          onClose={onAlertClose}
        />
      )}
    </PageContainer>
  )
}
