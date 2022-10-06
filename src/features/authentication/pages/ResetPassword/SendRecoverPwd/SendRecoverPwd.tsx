/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Box } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { useStyles } from './SendRecoverPwd.style'
import { SelectionCard } from 'components/SelectionCard'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { useHistory } from 'react-router-dom'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { KeyboardArrowRight } from '@material-ui/icons'
import { resetPassword, logout } from 'features/authentication/redux/actions'
import { RecoverType } from 'features/authentication/redux/models/recoverType'
import { Loader } from 'components/Loader'
import {
  ResetPasswordLoadingState,
  ErrorRecoverState,
  SuccessResetPasswordState,
} from 'features/authentication/redux/state'
import { Alert } from 'components/Alert'
import { ConfirmTokenSheet } from 'components/ConfirmTokenSheet'

export const SendRecoverPwd: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const dispatch = useDispatch()
  const [sendType, setSendType] = React.useState(Number)
  const [sentRequest, setSentRequest] = React.useState(false)
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)

  const authState = useSelector((state: StoreState) => state.auth)
  const { resetPasswordForm, user, errorMessage } = authState

  const _onSelectTokenSendingChannel = React.useCallback(
    (sendingChannel: RecoverType) => {
      setSendType(sendingChannel)
      setOpenAuthorizationSheet(true)
    },
    [],
  )

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(
        resetPassword({
          ...resetPasswordForm,
          sendType: sendType ? RecoverType.sms : RecoverType.mail,
        }),
      )
      setSentRequest(true)
    }
    setOpenAuthorizationSheet(false)
  }

  const _resetState = () => dispatch(logout())

  React.useEffect(() => {
    if (sentRequest && authState instanceof SuccessResetPasswordState)
      history.push(AuthenticationRoutes.confirmRecoverPwd)

    if (authState instanceof ErrorRecoverState) history.goBack()
  }, [authState, history])

  return (
    <PageContainer>
      {errorMessage && (
        <Alert title="Erro" message={errorMessage} severity={'error'} />
      )}
      <ProcessPageLayout
        appBar={<AppBar homeRoute={AccountRoutes.home} />}
        header={
          <ProcessDescriptionHeader
            title="Recuperar senha"
            subtitle="Primeiro passo"
            description="Essas são as formas disponíveis para envio da senha temporária."
          />
        }
        main={
          <Box className={styles.content}>
            <SelectionCard
              title="Receber no celular"
              subtitle={resetPasswordForm?.phoneNumber}
              endIcon={'next'}
              onClick={() => _onSelectTokenSendingChannel(RecoverType.sms)}
            />
            <SelectionCard
              title="Receber no e-mail"
              subtitle={resetPasswordForm?.mail}
              endIcon={'next'}
              onClick={() => _onSelectTokenSendingChannel(RecoverType.mail)}
            />
            <Loader open={authState instanceof ResetPasswordLoadingState} />
          </Box>
        }
        footer={<ProcessPageFooter onBackButtonClick={_resetState} />}
      />
      <ConfirmTokenSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationClose}
        sendType={sendType}
        taxId={resetPasswordForm?.taxId}
      />
    </PageContainer>
  )
}
