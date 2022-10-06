import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Drawer, Grid, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Alert } from 'components/Alert'
import { Button } from 'components/Button'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { Loader } from 'components/Loader'
import { PageContainer } from 'components/PageContainer'
import { getBaseRequestData } from '_utils/http'
import { StoreState } from 'redux/state'
import { HttpClient } from '_config/http'
import { ApiResponse } from '_config/api'
import { useStyles } from './PopUpConfirmToken.style'
import { OtpInput } from 'components/OtpInput'
import { Icon } from 'components/Icon'

interface PopUpConfirmTokenSheetState {
  loading: boolean
  message?: string
  success?: boolean
  validatedToken?: boolean
}

interface PopUpConfirmTokenSheetProps {
  nextRoute?: string
  phoneNumber?: string
  mail?: string
  taxId?: string
  open: boolean
  onClose: Function | ((tokenIsValid: boolean) => void)
}

export const PopUpConfirmToken: React.FC<PopUpConfirmTokenSheetProps> = ({
  nextRoute,
  phoneNumber,
  taxId,
  mail,
  open,
  onClose,
}) => {
  const [{ loading, success, validatedToken, message }, setState] =
    React.useState<PopUpConfirmTokenSheetState>({
      loading: false,
    })
  const [token, setToken] = React.useState('')
  const [disableConfirmButton, setDisableConfirmButton] = React.useState(true)
  const [requestToken] = useSelector((state: StoreState) => {
    return [state.auth.token]
  })
  const history = useHistory()
  const styles = useStyles()

  React.useEffect(() => {
    if (open) generateToken()
  }, [open])

  React.useEffect(() => {
    if (loading) setDisableConfirmButton(true)
    if (token.length === 6 && !loading) setDisableConfirmButton(false)
    else setDisableConfirmButton(true)
  }, [history, loading, nextRoute, token.length])

  React.useEffect(() => {
    if (validatedToken) onClose(validatedToken)
  }, [validatedToken])

  const generateToken = async () => {
    setState({ loading: true })

    try {
      const { url, defaultHeaders } = await getBaseRequestData(
        '/authorizationToken/GenerateUnauthenticatedAuthorizationToken',
      )
      const data = { phoneNumber, taxId, mail }

      await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${requestToken}`,
        },
      })
      setState({
        loading: false,
        success: true,
        message: 'Token gerado com sucesso, por favor aguarde o envio.',
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data
      setState({
        loading: false,
        message: response?.message ?? error.message,
      })
    }
  }

  const onTokenChange = (newValue: string) => {
    setToken(newValue)
  }

  const onCloseButtonClick = () => {
    onClose(validatedToken ?? false)
  }

  const onResendTokenButtonClick = () => {
    generateToken()
  }

  const onConfirmButtonClick = async () => {
    setState({ loading: true })
    try {
      const { url, defaultHeaders } = await getBaseRequestData(
        '/authorizationToken/ValidateUnauthenticatedAuthorizationToken',
      )
      const data = {
        code: token,
        taxId,
      }
      await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${requestToken}`,
        },
      })
      setState({
        loading: false,
        success: true,
        validatedToken: true,
        message: undefined,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data
      setState({
        loading: false,
        validatedToken: false,
        message: 'Não foi possível validar seu token.',
      })
    }
  }

  const onShowSucessMessageClose = () => {
    if (nextRoute) history.push(nextRoute)
  }

  return (
    <React.Fragment>
      <Drawer
        className={styles.drawer}
        anchor="bottom"
        elevation={0}
        open={open}
        onClose={() => onClose(validatedToken ?? false)}
        data-test-id="drawer"
      >
        <PageContainer>
          <Box className={styles.content}>
            <Box className={styles.closeButton}>
              <Button
                size="small"
                palette="secondary"
                onClick={onCloseButtonClick}
                startIcon={<Close color="primary" />}
                data-test-id="close-button"
              >
                Fechar
              </Button>
            </Box>
            <Grid container direction="column" spacing={4}>
              <Grid item data-test-id="input-token">
                <Typography variant="h6" gutterBottom>
                  Digite seu token
                </Typography>
                <Typography variant="body2" className={styles.subtitle}>
                  Está tudo certo? Agora é só inserir seu token para confirmar a
                  operação.
                </Typography>
              </Grid>
              <Grid item className={styles.inputRow}>
                <OtpInput
                  className={styles.OtpInput}
                  value={token}
                  onChange={onTokenChange}
                  isInputSecure={true}
                  numInputs={6}
                  data-test-id="change-token"
                />
              </Grid>
              <Grid item className={styles.buttonsRow}>
                <Grid container justify="center" spacing={4}>
                  <Grid item>
                    <ButtonWithFloatingIcon
                      onClick={onResendTokenButtonClick}
                      data-test-id="resend-token"
                    >
                      Reenviar Token
                    </ButtonWithFloatingIcon>
                  </Grid>
                  <Grid item>
                    <ButtonWithFloatingIcon
                      icon={<Icon name={'confirm'} />}
                      disabled={disableConfirmButton}
                      onClick={onConfirmButtonClick}
                      data-test-id="confirm-button"
                    >
                      Confirmar
                    </ButtonWithFloatingIcon>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </PageContainer>
      </Drawer>
      <Loader open={loading} />
      {message && (
        <Alert
          title={success ? 'Sucesso' : 'Erro'}
          message={message}
          severity={success ? 'success' : 'error'}
          onClose={validatedToken ? onShowSucessMessageClose : undefined}
        />
      )}
    </React.Fragment>
  )
}
