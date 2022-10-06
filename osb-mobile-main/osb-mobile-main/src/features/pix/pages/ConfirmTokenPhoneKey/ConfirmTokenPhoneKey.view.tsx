import { Box, Grid, Typography } from '@material-ui/core'
import {
  Close,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@material-ui/icons'
import {
  AppBar,
  Button,
  ButtonWithFloatingIcon,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooter,
  ProcessPageFooterButton,
  ProcessPageLayout,
} from 'components'
import { Alert } from 'components/Alert'
import { AlertConcluded } from 'components/AlertConcluded'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { Icon } from 'components/Icon'
import { Loader } from 'components/Loader'
import { cancelLabel, confirmLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import React from 'react'
import OtpInput from 'react-otp-input'
import { useStyles } from './ConfirmTokenPhoneKey.styles'

interface ConfirmTokenPhoneKeyProps {
  value: string
  onTokenChange: (event: string) => void
  onDefineClick: VoidFunction
  onCancelButtonClick: VoidFunction
  userPixKey: string
  errorMessage?: string
  loading: boolean
  onShowAlert: boolean
  message?: string
  onCloseAlert: VoidFunction
  onClickAlert: VoidFunction
  onAlertClose: VoidFunction
  onResendTokenButtonClick: (event: any) => void
  onBack: VoidFunction
}

export const ConfirmTokenPhoneKeyView: React.FC<ConfirmTokenPhoneKeyProps> = ({
  value,
  onTokenChange,
  onDefineClick,
  onCancelButtonClick,
  userPixKey,
  errorMessage,
  loading,
  message,
  onAlertClose,
  onCloseAlert,
  onClickAlert,
  onShowAlert,
  onResendTokenButtonClick,
  onBack,
}) => {
  const style = useStyles()
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
            title="Registrar chave PIX"
            subtitle={userPixKey.substring(3)}
            description="Insira o código recebido por SMS para confirmar solicitação"
          />
        }
        main={
          <Box className={style.boxContent}>
            <Typography className={style.label}>Token</Typography>
            <OtpInput
              className={style.tokenInput}
              value={value}
              onChange={onTokenChange}
              isInputNum
              isInputSecure
              numInputs={6}
            />
            <Grid container justify="center" spacing={4}>
              <ButtonWithFloatingIcon
                className={style.buttonWithFloatingIcon}
                onClick={onResendTokenButtonClick}
                data-test-id="resend-token"
                icon={<Icon name="buttonBg" />}
              >
                Reenviar Token
              </ButtonWithFloatingIcon>
            </Grid>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <ProcessPageFooterButton
                primary
                disabled={!(value.length === 6)}
                endIcon={<KeyboardArrowRight />}
                onClick={onDefineClick}
              >
                {confirmLabel}
              </ProcessPageFooterButton>
            }
            secondaryButton={
              <Button
                palette="secondary"
                startIcon={<KeyboardArrowLeft color="secondary" />}
                onClick={onBack}
              >
                Voltar
              </Button>
            }
          />
        }
      />
      <Loader open={loading} />
      {message && (
        <Alert
          title={'Sucesso'}
          message={message}
          severity={'success'}
          onClose={undefined}
        />
      )}
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
