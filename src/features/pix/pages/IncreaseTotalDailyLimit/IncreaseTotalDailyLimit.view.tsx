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
import { useStyles } from './IncreaseTotalDailyLimit.style'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AccountRoutes } from 'features/account/constants/routes'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Icon } from 'components/Icon'

interface IncreaseTotalDailyLimitProps {
  onAlertClose: VoidFunction
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onNextButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
  onAuthorizationClose: (tokenIsValid: boolean) => void
  value: string
  loading: boolean
  errorMessage?: string
  maxLimitValue: number
  disableNextButton: boolean
  openAuthorizationSheet: boolean
  changeOperationLimitSuccessMessage?: string
}

export const IncreaseTotalDailyLimitView: React.FC<
  IncreaseTotalDailyLimitProps
> = ({
  onAlertClose,
  onValueChange,
  onNextButtonClick,
  onCancelButtonClick,
  onAuthorizationClose,
  value,
  loading,
  errorMessage,
  maxLimitValue,
  disableNextButton,
  openAuthorizationSheet,
  changeOperationLimitSuccessMessage,
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
          <Box className={styles.titleWarper}>
            <ProcessDescriptionHeader title="Solicitar aumento de limite diário" />
            <Typography
              id="pd-description"
              variant="body1"
              className={styles.description}
            >
              Seu limite atual é
              <strong> {CurrencyFormatter.format(maxLimitValue)} </strong>
            </Typography>
          </Box>
        }
        main={
          <Box className={styles.mainWarper}>
            <Box className={styles.mainWarperForm}>
              <TextField
                label="Qual o limite ideal para você?"
                placeholder="R$ 2.000,00"
                value={
                  isNaN(parseCurrency(value))
                    ? CurrencyFormatter.format(0)
                    : value
                }
                onChange={onValueChange}
              />
            </Box>
            <Box className={styles.infoContainer}>
              <Icon name="InfoIcon" />
              <Box>
                <Typography className={styles.infoContainerText}>
                  <Box>A solicitação pode levar de</Box>
                  <Box component="span" className={styles.infoText}>
                    24 à 48 horas
                  </Box>
                  para ser aprovada!
                </Typography>
              </Box>
            </Box>
          </Box>
        }
        footer={
          <Box className={styles.buttonsWrapper}>
            <Button
              palette="primary"
              endIcon={<KeyboardArrowRight color="secondary" />}
              disabled={disableNextButton}
              onClick={onNextButtonClick}
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
