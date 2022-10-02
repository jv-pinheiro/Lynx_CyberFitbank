import { Box, Grid, Typography } from '@material-ui/core'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooter,
  ProcessPageFooterButton,
  ProcessPageLayout,
  SelectionCard,
  TextField,
  TransparentTextField,
} from 'components'
import { ErrorMessage } from 'components/ErrorMessage'
import { SchedulingButton } from 'components/SchedulingButton'
import { TransparentDateField } from 'components/TransparentDateFild'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import React from 'react'
import { useStyles } from './KeyTransferValue.style'

interface KeyTransferValueViewProps {
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onNextButtonClick: VoidFunction
  onDatePickerClose: VoidFunction
  onSchedulingButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
  openDatePicker: boolean
  onDateChange: (date: Date | null) => void
  minDate: Date
  displayDate: string
  isValidValue: boolean
  valueInput: string
  _getDisplayDate: VoidFunction
  balanceIsValid?: boolean | undefined
  payeeName?: string
  payeePixKeyValue?: string
}

export const KeyTransferValueView: React.FC<KeyTransferValueViewProps> = ({
  onValueChange,
  onNextButtonClick,
  onDatePickerClose,
  onSchedulingButtonClick,
  onCancelButtonClick,
  openDatePicker,
  onDateChange,
  valueInput,
  isValidValue,
  displayDate,
  minDate,
  _getDisplayDate,
  balanceIsValid,
  payeeName,
  payeePixKeyValue,
}) => {
  const styles = useStyles()

  return (
    <PageContainer className={styles.page}>
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
          <>
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
            </Grid>
            <Box className={styles.payeeSection}>
              <Typography className={styles.text}>
                Você está fazendo um PIX para
              </Typography>
              <SelectionCard
                variant="pix"
                id="payee-info-card"
                title={payeeName ?? '---'}
                subtitle={payeePixKeyValue ?? '---'}
              />
            </Box>
          </>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <ProcessPageFooterButton
                primary
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={!isValidValue}
                onClick={onNextButtonClick}
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
