import React from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AccountRoutes } from 'features/account/constants/routes'
import { cancelLabel } from 'constants/buttons/labels'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowLeft } from '@material-ui/icons'
import { Box, Grid, Typography } from '@material-ui/core'
import { CurrencyFormatter } from '_translate'
import { ButtonWithFloatingIcon, SelectionCard } from 'components'
import { useStyles } from './CheckPixQrCode.style'
import { PixKeySelection } from '../components/PixKeySelection'
import { SharePixQrCode } from '../components/SharePixQrCode'

interface CheckPixQrCodeViewProps {
  onBackButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
  onSharePixQrCodeClick: VoidFunction
  onSharePixQrCode: boolean
  onSharePixQrCodeClose: Function | ((onPixKeySelectionValid: boolean) => void)
  qrCodeBase64: string | undefined
  value: number
  payeePixKeyValue?: string
  pixKeyType?: string
}

export const CheckPixQrCodeView: React.FC<CheckPixQrCodeViewProps> = ({
  onBackButtonClick,
  onCancelButtonClick,
  qrCodeBase64,
  value,
  payeePixKeyValue,
  onSharePixQrCodeClick,
  onSharePixQrCode,
  onSharePixQrCodeClose,
  pixKeyType,
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
                startIcon={<Close color="inherit" />}
                onClick={onCancelButtonClick}
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <React.Fragment>
            <ProcessDescriptionHeader title="Receber pagamento via PIX" />
            <Grid
              container
              direction="column"
              spacing={1}
              className={styles.subheader}
            >
              <Grid item>
                <Typography className={styles.subtitle} align="center">
                  Você está cobrando
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  align="center"
                  className={styles.value}
                >
                  {CurrencyFormatter.format(value)}
                </Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        }
        main={
          <Grid container direction="column">
            <Grid item className={styles.qrCodeWrapper}>
              <img
                className={styles.qrCode}
                src={`data:image/png;base64,${qrCodeBase64}`}
                alt="qr code"
              />
            </Grid>
            <Grid item>
              <Typography className={styles.subtitle} align="center">
                Mostre esse QR Code para o pagador <br></br> ou
              </Typography>
            </Grid>
            <Box display="Flex" justifyContent="center">
              <Button onClick={onSharePixQrCodeClick}>Compartilhe</Button>
            </Box>
            <Grid item>
              <Typography className={styles.subtitle} align="center">
                Ao ler o QR Code o pagador verá os dados do pagamento
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={styles.subtitle} align="center">
                Chave
              </Typography>
              <Typography className={styles.text} align="center">
                {pixKeyType}: {payeePixKeyValue}
              </Typography>
            </Grid>
          </Grid>
        }
        footer={
          <ProcessPageFooter
            secondaryButton={
              <Button
                palette="secondary"
                onClick={onBackButtonClick}
                data-test-id="cancel-button"
              >
                Voltar para o PIX
              </Button>
            }
          />
        }
      />
      <SharePixQrCode open={onSharePixQrCode} onClose={onSharePixQrCodeClose} />
    </PageContainer>
  )
}
