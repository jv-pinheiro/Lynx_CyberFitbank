import React from 'react'
import { Alert } from 'components/Alert'
import { Loader } from 'components/Loader'
import { Button } from 'components/Button'
import { AppBar } from 'components/AppBar'
import { CurrencyFormatter, parseCurrency } from '_translate'
import { TextField } from 'components/TextField'
import InfoIcon from '_assets/icons/InfoIcon.svg'
import { Box, Typography } from '@material-ui/core'
import { cancelLabel } from 'constants/buttons/labels'
import { PageContainer } from 'components/PageContainer'
import { useStyles } from './IncreaseNightlyLimit.style'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AccountRoutes } from 'features/account/constants/routes'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'

interface IncreaseNightlyLimitProps {
  onCancelButtonClick: VoidFunction
  onSubmit: VoidFunction
  onAuthorizationClose: (tokenIsValid: boolean) => void
  onAlertClose: VoidFunction
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  maxLimitValue: number
  loading: boolean
  disableNextButton: boolean
  openAuthorizationSheet: boolean
  errorMessage?: string
  changeOperationLimitSuccessMessage?: string
}

export const IncreaseNightlyLimitView: React.FC<IncreaseNightlyLimitProps> = ({
  onCancelButtonClick,
  onSubmit,
  onAuthorizationClose,
  onAlertClose,
  onValueChange,
  value,
  maxLimitValue,
  loading,
  disableNextButton,
  errorMessage,
  changeOperationLimitSuccessMessage,
  openAuthorizationSheet,
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
          <Box className={styles.titlePage}>
            <ProcessDescriptionHeader title="Solicitar aumento de limite noturno" />
            <Typography
              id="pd-description"
              variant="body1"
              className={styles.descriptionHeader}
            >
              Seu limite atual é
              <strong> {CurrencyFormatter.format(maxLimitValue)} </strong>
            </Typography>
          </Box>
        }
        main={
          <Box className={styles.containerMain}>
            <Box
              component="form"
              onSubmit={onSubmit}
              className={styles.textMain}
            >
              <TextField
                placeholder="R$1.000,00"
                label="Qual o limite ideal para você?"
                value={
                  isNaN(parseCurrency(value))
                    ? CurrencyFormatter.format(0)
                    : value
                }
                onChange={onValueChange}
              />
            </Box>
            <Box className={styles.containerInfo}>
              <img src={InfoIcon} alt="infoIcon" />
              <Box>
                <Typography className={styles.infoText}>
                  <Box>A solicitação pode levar de</Box>
                  <Box component="span" className={styles.infoTextHours}>
                    24 à 48 horas
                  </Box>
                  para ser aprovada!
                </Typography>
              </Box>
            </Box>
          </Box>
        }
        footer={
          <Box className={styles.buttonAsk}>
            <Button
              palette="primary"
              endIcon={<KeyboardArrowRight color="secondary" />}
              disabled={disableNextButton}
              onClick={onSubmit}
            >
              Solicitar
            </Button>
          </Box>
        }
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationClose}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Error" message={errorMessage} severity="error" />
      )}
      {changeOperationLimitSuccessMessage && (
        <Alert
          title="Sucesso"
          message={changeOperationLimitSuccessMessage}
          severity="success"
          onClose={onAlertClose}
        />
      )}
    </PageContainer>
  )
}
