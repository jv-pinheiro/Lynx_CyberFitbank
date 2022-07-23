import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { AppBar } from 'components/AppBar'
import { useStyles } from './PixChangeValue.style'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AccountRoutes } from 'features/account/constants/routes'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { TransparentTextField } from 'components/TransparentTextField'
import { Validator } from 'components/Validator'
import { ProcessPageFooter } from 'components'
import { KeyboardArrowRight } from '@material-ui/icons'
import { CurrencyFormatter } from '_translate'

interface PixChangeValueViewProps {
  onCancelButtonClick: VoidFunction
  valueInput: string
  setValueInput: (value: string) => void
  onNextButtonClick: () => void
  disableNextButton: boolean
  onValidateBalance: (resultValidation?: boolean) => void
  validateBalance: (value: string) => boolean
  toCompanyBankName?: string
  companyTaxId: string
  companyName: string
  purchaseValue: number
  pixChangeLimit: number
}

export const PixChangeValueView: React.FC<PixChangeValueViewProps> = ({
  onCancelButtonClick,
  valueInput,
  setValueInput,
  onNextButtonClick,
  disableNextButton,
  onValidateBalance,
  validateBalance,
  toCompanyBankName,
  companyTaxId,
  companyName,
  purchaseValue,
  pixChangeLimit,
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
          <>
            <ProcessDescriptionHeader title="Pix Troco" />
            <Grid
              container
              direction="column"
              spacing={1}
              className={styles.boxHeader}
            >
              <Grid item>
                <TransparentTextField
                  label="Quanto deseja receber em dinheiro?"
                  value={valueInput}
                  onChange={e => setValueInput(e.currentTarget.value)}
                />
              </Grid>
              {validateBalance(valueInput) && (
                <Grid item>
                  <Validator
                    value={valueInput}
                    description={
                      'Saldo insuficiente ou valor acima do limite permitido'
                    }
                    validation={validateBalance}
                    onValidate={onValidateBalance}
                    strictValidation={true}
                  />
                </Grid>
              )}
            </Grid>
          </>
        }
        main={
          <React.Fragment>
            <React.Fragment>
              <Box mt={1}></Box>
              <Box className={styles.informationBoxWrapper}>
                <Typography className={styles.labelInformation}>
                  Nenhuma taxa adicional será cobrada
                </Typography>
                <Typography className={styles.limitInformation}>
                  Limite para essa transação:
                  {CurrencyFormatter.format(pixChangeLimit)}
                </Typography>
              </Box>
              <Box className={styles.informationBoxWrapper}>
                <Typography className={styles.purchaseInformation}>
                  Valor da compra
                </Typography>
                <Typography className={styles.purchaseValue}>
                  {CurrencyFormatter.format(purchaseValue)}
                </Typography>
              </Box>
              <Box
                fontSize={12}
                fontWeight={500}
                component="h1"
                className={styles.boxTitle}
              >
                Você está realizando um Pix Troco em
              </Box>
              <Box className={styles.paymentRecipientDetails}>
                <Box fontSize={13} fontWeight={500}>
                  {companyName}
                </Box>
                <Box fontSize={12} fontWeight={300}>
                  CNPJ:
                  <span className={styles.fontWeightNormal}>
                    {companyTaxId}
                  </span>
                </Box>
                <Box fontSize={12} fontWeight={300}>
                  {toCompanyBankName}
                </Box>
              </Box>
            </React.Fragment>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                disabled={disableNextButton}
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
    </PageContainer>
  )
}
