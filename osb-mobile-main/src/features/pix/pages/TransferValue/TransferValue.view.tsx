import React from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AccountRoutes } from 'features/account/constants/routes'
import { useStyles } from './TransferValue.style'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { Box, Grid, Typography } from '@material-ui/core'
import {
  ProcessPageFooterButton,
  SelectionCard,
  TransparentTextField,
} from 'components'
import { SchedulingButton } from 'components/SchedulingButton'
import { TransparentDateField } from 'components/TransparentDateFild'
import { ErrorMessage } from 'components/ErrorMessage'

interface TransferValuesViewProps {
  onCancelButtonClick: VoidFunction
  onSchedulingButtonClick: VoidFunction
  onDateChange: (date: Date | null) => void
  onDatePickerClose: VoidFunction
  isValidValue: boolean
  minDate: Date
  displayDate: string
  choseDate: boolean
  openDatePicker: boolean
  valueInput: string
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: VoidFunction
  balanceIsValid: boolean | undefined
  name: string
  taxId?: string
  bankBranch?: string
  bankAccount?: string
  bankAccountDigit?: string
  bankName?: string
}

export const TransferValueView: React.FC<TransferValuesViewProps> = ({
  onCancelButtonClick,
  onSchedulingButtonClick,
  onDateChange,
  onDatePickerClose,
  isValidValue,
  onValueChange,
  minDate,
  displayDate,
  choseDate,
  openDatePicker,
  valueInput,
  onSubmit,
  balanceIsValid,
  name,
  taxId,
  bankBranch,
  bankAccount,
  bankAccountDigit,
  bankName,
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
            <ProcessDescriptionHeader title="Transferência com Pix" />
            <Grid
              container
              direction="column"
              spacing={1}
              className={styles.subheader}
            >
              <Grid item>
                <TransparentTextField
                  label="Qual o valor do Pix?"
                  value={valueInput}
                  onChange={onValueChange}
                />
              </Grid>
              <Grid item>
                {!balanceIsValid && (
                  <ErrorMessage message={'Saldo insuficiente'} />
                )}
              </Grid>
            </Grid>
          </React.Fragment>
        }
        main={
          <Grid container direction="column">
            <Grid item>
              <TransparentDateField label="Quando?" value={displayDate} />
            </Grid>
            <Grid item>
              <Grid
                container
                justify="center"
                className={styles.scheduleButton}
              >
                <Grid item>
                  <SchedulingButton
                    open={openDatePicker}
                    value={minDate}
                    minDate={minDate}
                    onClick={onSchedulingButtonClick}
                    onDateSelection={onDateChange}
                    onClose={onDatePickerClose}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Box className={styles.payeeSection}>
              <Typography className={styles.text}>
                Você está fazendo um PIX para
              </Typography>
              <SelectionCard
                id="receiver-info-card"
                title={name}
                subtitle={`CPF: ${taxId}`}
                bank={`Banco: ${bankName}`}
                bankBranch={`Agência ${bankBranch}`}
                bankAccount={`Conta ${bankAccount}-${bankAccountDigit}`}
              />
            </Box>
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <ProcessPageFooterButton
                primary
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={!isValidValue}
                onClick={onSubmit}
              >
                {nextLabel}
              </ProcessPageFooterButton>
            }
          />
        }
      />
    </PageContainer>
  )
}
