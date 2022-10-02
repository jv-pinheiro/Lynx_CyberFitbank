import { Box, Grid, Typography } from '@material-ui/core'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
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
import { Loader } from 'components/Loader'
import { cancelLabel, confirmLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import React from 'react'
import OtpInput from 'react-otp-input'
import { useStyles } from './ConfirmTokenEmailKey.styles'
import { Icon } from 'components/Icon'

interface ConfirmTokenEmailKeyProps {
  value: string
  onTokenChange: (event: string) => void
  onDefineClick: VoidFunction
  onCancelButtonClick: VoidFunction
  errorMessage?: string
  message?: string
  userPixKey: string
  loading: boolean
  onShowAlert: boolean
  onCloseAlert: VoidFunction
  onClickAlert: VoidFunction
  onAlertClose: VoidFunction
  onResendTokenButtonClick: (event: any) => void
}

export const ConfirmTokenEmailKeyView: React.FC<ConfirmTokenEmailKeyProps> = ({
  value,
  onTokenChange,
  onCancelButtonClick,
  onDefineClick,
  userPixKey,
  errorMessage,
  message,
  loading,
  onAlertClose,
  onCloseAlert,
  onClickAlert,
  onShowAlert,
  onResendTokenButtonClick,
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
            subtitle={userPixKey}
            description="Insira o código recebido por email para confirmar solicitação"
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
