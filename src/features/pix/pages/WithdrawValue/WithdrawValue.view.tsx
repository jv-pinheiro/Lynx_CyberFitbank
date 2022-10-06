import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { AppBar } from 'components/AppBar'
import { useStyles } from './WithdrawValue.style'
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

interface WithdrawValueViewProps {
  onCancelButtonClick: VoidFunction
  valueInput: string
  setValueInput: (value: string) => void
  onNextButtonClick: () => void
  disableNextButton: boolean
  onValidateBalance: (resultValidation?: boolean) => void
  validateBalance: (value: string) => boolean
  companyName: string
  companyTaxId: string
  toCompanyBankName: string
  pixWithdrawLimit: number
}

export const WithdrawValueView: React.FC<WithdrawValueViewProps> = ({
  onCancelButtonClick,
  valueInput,
  setValueInput,
  onNextButtonClick,
  disableNextButton,
  onValidateBalance,
  validateBalance,
  companyName,
  companyTaxId,
  toCompanyBankName,
  pixWithdrawLimit,
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
            <ProcessDescriptionHeader title="Pix Saque" />
            <Grid
              container
              direction="column"
              spacing={1}
              className={styles.boxHeader}
            >
              <Grid item>
                <TransparentTextField
                  label="Qual o valor deseja sacar?"
                  value={valueInput}
                  onChange={event => setValueInput(event.currentTarget.value)}
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
            <Box mt={1}></Box>
            <Box className={styles.informationBoxWrapper}>
              <Typography className={styles.labelInformation}>
                Nenhuma taxa adicional será cobrada
              </Typography>
              <Typography className={styles.limitInformation}>
                Limite para essa transação:
                {CurrencyFormatter.format(pixWithdrawLimit)}
              </Typography>
            </Box>
            <Box
              fontSize={12}
              fontWeight={500}
              component="h1"
              className={styles.boxTitle}
            >
              Você está realizando um Pix Saque em
            </Box>
            <Box className={styles.paymentRecipientDetails}>
              <Box fontSize={13} fontWeight={500}>
                {companyName}
              </Box>
              <Box fontSize={12} fontWeight={300}>
                {companyTaxId?.length === 14 ? `CPF` : `CNPJ`}
                <span className={styles.fontWeightNormal}>{companyTaxId}</span>
              </Box>
              <Box fontSize={12} fontWeight={300}>
                {toCompanyBankName}
              </Box>
            </Box>
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
