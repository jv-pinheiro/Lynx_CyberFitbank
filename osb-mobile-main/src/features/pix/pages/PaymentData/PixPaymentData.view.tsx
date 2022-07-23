import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import {
  Close,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@material-ui/icons'
import { Button } from 'components/Button'
import {
  cancelLabel,
  nextLabel,
  returnLabel,
  scheduleLabel,
} from 'constants/buttons/labels'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Box, Typography } from '@material-ui/core'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { useStyles } from './PixPaymentData.style'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix/constants/routes'

interface PixPaymentDataViewProps {
  onBackButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
  onNextButtonClick: VoidFunction
  onSchedulingButtonClick: VoidFunction
}

export const PixPaymentDataView: React.FC<PixPaymentDataViewProps> = ({
  onBackButtonClick,
  onCancelButtonClick,
  onNextButtonClick,
  onSchedulingButtonClick,
}) => {
  const styles = useStyles()

  return (
    <Box className={styles.boxContainer}>
      <PageContainer>
        <ProcessPageLayout
          appBar={
            <AppBar
              homeRoute="#"
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
            <React.Fragment>
              <ProcessDescriptionHeader title="Pagamento PIX" />
              <Box className={styles.boxValue}>
                <Typography className={styles.labelValue}>
                  Valor da cobrança
                </Typography>
                <Typography className={styles.value}>R$ 125,00</Typography>
              </Box>
            </React.Fragment>
          }
          main={
            <React.Fragment>
              <Box mt={1}></Box>
              <Box className={styles.informationPaymentDate}>
                <Typography className={styles.labelInformationPaymentDate}>
                  Data de pagamento
                </Typography>
                <Typography className={styles.valueInformationPaymentDate}>
                  Hoje
                </Typography>
                <ButtonWithFloatingIcon onClick={onSchedulingButtonClick}>
                  {scheduleLabel}
                </ButtonWithFloatingIcon>
              </Box>
              <Box
                fontSize={12}
                fontWeight={500}
                component="h1"
                className={styles.titlePayee}
              >
                Recebedor
              </Box>
              <Box className={styles.paymentRecipientDetails}>
                <Box fontSize={13} fontWeight={500}>
                  Nome da empresa
                </Box>
                <Box fontSize={12} fontWeight={300}>
                  CNPJ:{' '}
                  <span className={styles.fontWidth400}>
                    00-000-000/0001-00
                  </span>
                </Box>
                <Box fontSize={12} fontWeight={300}>
                  Banco <span className={styles.fontWidth400}>ABC</span>
                </Box>
                <Box fontSize={12} fontWeight={300}>
                  Código de barras:
                  <Box className={styles.fontWidth400}>
                    00000000000000 0000000000 0000000000 0000000000000000
                  </Box>
                </Box>
              </Box>
            </React.Fragment>
          }
          footer={
            <ProcessPageFooter
              primaryButton={
                <Button
                  endIcon={<KeyboardArrowRight color="secondary" />}
                  onClick={onNextButtonClick}
                >
                  {nextLabel}
                </Button>
              }
              secondaryButton={
                <Button
                  palette="secondary"
                  startIcon={<KeyboardArrowLeft color="secondary" />}
                  onClick={onBackButtonClick}
                >
                  {returnLabel}
                </Button>
              }
            />
          }
        />
      </PageContainer>
    </Box>
  )
}
