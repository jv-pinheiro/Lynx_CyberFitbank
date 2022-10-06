import React from 'react'
import { Alert } from 'components/Alert'
import { Close } from '@material-ui/icons'
import { Button } from 'components/Button'
import { AppBar } from 'components/AppBar'
import { Loader } from 'components/Loader'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './PixPayment.Limit.style'
import { cancelLabel } from 'constants/buttons/labels'
import { PageContainer, ProcessPageFooter } from 'components'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ChooseLimitPopUp } from 'features/pix/components/Popup/ChooseLimitPopUp'

interface PixPaymentLimitProps {
  onBackButtonClick: VoidFunction
  onClosePopup: VoidFunction
  onCloseButtonClick: VoidFunction
  onButtonOpenPopupClick: VoidFunction
  loading: boolean
  errorMessage?: string
  openChooseLimitPopup: boolean
  maxLimitDailyFormatted: string
  maxLimitNightlyFormatted: string
  maxLimitTransactionFormatted: string
}

export const PixPaymentLimitView: React.FC<PixPaymentLimitProps> = ({
  onBackButtonClick,
  onClosePopup,
  onCloseButtonClick,
  onButtonOpenPopupClick,
  loading,
  errorMessage,
  openChooseLimitPopup,
  maxLimitDailyFormatted,
  maxLimitNightlyFormatted,
  maxLimitTransactionFormatted,
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
                onClick={onCloseButtonClick}
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <Box>
            <Box className={styles.header}>
              <ProcessDescriptionHeader title="Limite de pagamento com Pix" />
            </Box>
            <Box className={styles.totalDailyLimit}>
              <Typography className={styles.textMain}>
                Seu limite diário total
              </Typography>
              <Typography className={styles.textValue}>
                {maxLimitDailyFormatted}
              </Typography>
              <Typography className={styles.valueAvailable}>
                Disponível: {maxLimitDailyFormatted}
              </Typography>
            </Box>
          </Box>
        }
        main={
          <Box>
            <Typography className={styles.textManyLimits}>
              Demais limites
            </Typography>
            <Box className={styles.listOfLimits}>
              <Typography className={styles.typeLimits}>
                Noturno
                <Typography className={styles.typeLimitsValue}>
                  {maxLimitNightlyFormatted}
                </Typography>
              </Typography>
              <Typography className={styles.typeLimits}>
                Transação
                <Typography className={styles.typeLimitsValue}>
                  {maxLimitTransactionFormatted}
                </Typography>
              </Typography>
              <Typography className={styles.typeLimits}>
                Saque/Troco
                <Typography className={styles.typeLimitsValue}>
                  R$ 500,00
                </Typography>
              </Typography>
              {/* <Typography className={styles.typeLimits}>
                Favoritos <Typography className={styles.typeLimitsValue}> R$ 2.000,00</Typography>
              </Typography> */}
            </Box>
            <Box className={styles.adjustmentButton}>
              <Button
                palette="primary"
                size="medium"
                onClick={onButtonOpenPopupClick}
              >
                Ajustar limites
              </Button>
            </Box>
            <ChooseLimitPopUp
              open={openChooseLimitPopup}
              onClose={onClosePopup}
            />
          </Box>
        }
        footer={<ProcessPageFooter onBackButtonClick={onBackButtonClick} />}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Erro" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
