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
import { useStyles } from './CreatePhoneKey.styles'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'

interface CreatePhoneKeyViewProps {
  onDefineClick: VoidFunction
  onCancelButtonClick: VoidFunction
  onCloseAlert: VoidFunction
  onTaxIdChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  name: string
  bank: string
  taxId: string
  loading: boolean
  errorMessage?: string
}
export const CreatePhoneKeyView: React.FC<CreatePhoneKeyViewProps> = ({
  onDefineClick,
  onCancelButtonClick,
  onTaxIdChange,
  onCloseAlert,
  value,
  name,
  bank,
  taxId,
  errorMessage,
  loading,
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
            subtitle="Registrar seu celular como chave Pix"
            description="Você receberá um código via SMS para confirmar a solicitação"
          />
        }
        main={
          <Box
            component="form"
            onSubmit={onDefineClick}
            className={styles.phoneInput}
          >
            <TextField
              label="Número de celular"
              placeholder="(XX) XXXX.XXXX"
              value={value}
              onChange={onTaxIdChange}
              inputMode={'numeric'}
            />
            <Typography variant="subtitle1" className={styles.importantWarning}>
              <strong>Aviso importante</strong>
            </Typography>
            <Typography className={styles.txtalert}>
              Todos os demais usuário do Pix poderão saber que você tem uma
              chave Pix de e-mail ou de número de telefone celular registrada,
              porém, sua chave não será exibida. Mesmo usando essa chave para
              realizar uma transferência para você, o pagador verá as seguintes
              informações:
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
                disabled={value.length < 16}
                endIcon={<KeyboardArrowRight />}
                onClick={onDefineClick}
              >
                {nextLabel}
              </ProcessPageFooterButton>
            }
          />
        }
        footerPosition="fixed"
      />
      <Loader open={loading} />

      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onCloseAlert}
        />
      )}
    </PageContainer>
  )
}
