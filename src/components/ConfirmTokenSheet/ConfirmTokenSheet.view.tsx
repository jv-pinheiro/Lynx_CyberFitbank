import React from 'react'
import { Box, Drawer, Grid, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Alert } from 'components/Alert'
import { Button } from 'components/Button'
import { Loader } from 'components/Loader'
import { PageContainer } from 'components/PageContainer'
import { useStyles } from './ConfirmTokenSheet.style'
import confirmIcon from '_assets/icons/icn-confirm.svg'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import OtpInput from 'react-otp-input'
interface ConfirmTokenSheetProps {
  open: boolean
  onClose: VoidFunction
  token: string
  onTokenChange: any
  onResendTokenClick: VoidFunction
  disableConfirmButton: boolean
  onConfirmClick: VoidFunction
  state: { loading: boolean; message?: string; success?: boolean }
  onCloseMessage: VoidFunction
}

export const ConfirmTokenSheetView: React.FC<ConfirmTokenSheetProps> = ({
  open,
  onClose,
  token,
  onTokenChange,
  onResendTokenClick,
  disableConfirmButton,
  onConfirmClick,
  state,
  onCloseMessage,
}) => {
  const styles = useStyles()
  const { loading, message, success } = state
  return (
    <React.Fragment>
      <Drawer
        className={styles.drawer}
        anchor="bottom"
        elevation={0}
        open={open}
        onClose={onClose}
      >
        <PageContainer>
          <Box className={styles.content}>
            <Box className={styles.closeButton}>
              <Button
                size="small"
                palette="secondary"
                onClick={onClose}
                startIcon={<Close color="primary" />}
              >
                Fechar
              </Button>
            </Box>
            <Grid container direction="column" spacing={4}>
              <Grid item>
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
                  className="input"
                  value={token}
                  onChange={onTokenChange}
                  isInputSecure={true}
                  numInputs={6}
                />
              </Grid>
              <Grid item className={styles.buttonsRow}>
                <Grid container justify="center" spacing={4}>
                  <Grid item>
                    <ButtonWithFloatingIcon onClick={onResendTokenClick}>
                      Reenviar Token
                    </ButtonWithFloatingIcon>
                  </Grid>
                  <Grid item>
                    <ButtonWithFloatingIcon
                      icon={confirmIcon}
                      disabled={disableConfirmButton}
                      onClick={onConfirmClick}
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
          onClose={onCloseMessage}
        />
      )}
    </React.Fragment>
  )
}
