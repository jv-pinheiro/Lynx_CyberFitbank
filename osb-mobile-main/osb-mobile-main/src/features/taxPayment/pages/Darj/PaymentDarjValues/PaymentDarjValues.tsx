import React from 'react'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Grid } from '@material-ui/core'
import { TextField } from 'components/TextField'
import { useHistory } from 'react-router-dom'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { maskMoney } from '_utils/masks/money'
import { useMask } from 'hooks/useMask'
import { CurrencyFormatter, parseCurrency } from '_translate'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { SuccessTaxPaymentState } from 'features/taxPayment/redux/state'
import { updateDarjPaymentData } from 'features/taxPayment/redux/actions'

export const PaymentDarjValues: React.FC = () => {
  const [totalValue, setTotalValue] = useMask(maskMoney)
  const [fineValue, setFineValue] = useMask(maskMoney)
  const [interestValue, setInterestValue] = useMask(maskMoney)
  const [principalValue, setPrincipalValue] = useMask(maskMoney)
  const [rateValue, setRateValue] = useMask(maskMoney)
  const [isValidTotalValue, setIsValidTotalValue] = React.useState(true)
  const history = useHistory()

  const onTotalValueDarj = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalValue(event.target.value)
  }

  const onFineValueDarj = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFineValue(event.target.value)
  }

  const onInterestValueDarj = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterestValue(event.target.value)
  }

  const onPrincipalValueDarj = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrincipalValue(event.target.value)
  }

  const onRateValueDarj = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRateValue(event.target.value)
  }

  React.useEffect(() => {
    const onlyTotalValue = parseCurrency(principalValue)
    setIsValidTotalValue(
      !(onlyTotalValue > 0 && onlyTotalValue && principalValue),
    )
  }, [principalValue])

  const onCancelButtonClick = () => {
    dispatch(updateDarjPaymentData())
    history.replace(AccountRoutes.home)
  }

  const taxPaymentState = useSelector((state: StoreState) => state.taxPayment)

  const dispatch = useDispatch()

  const onNextButtonClick = () => {
    history.push(TaxPaymentRoutes.paymentDarjDueDate)
    dispatch(
      updateDarjPaymentData({
        principalValue: parseFloat(parseCurrency(principalValue).toFixed(2)),
        fineValue: parseFloat(parseCurrency(fineValue).toFixed(2)),
        interestValue: parseFloat(parseCurrency(interestValue).toFixed(2)),
        rateValue: parseFloat(parseCurrency(rateValue).toFixed(2)),
      }),
    )
  }

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
                data-test-id="cancel-button"
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={<ProcessDescriptionHeader title="Impostos - DARJ" />}
        main={
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="Valor Principal"
                value={
                  isNaN(parseCurrency(principalValue))
                    ? CurrencyFormatter.format(0)
                    : principalValue
                }
                onChange={onPrincipalValueDarj}
                placeholder="R$ 0,00"
                data-test-id="principal-value-darj"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Multa"
                value={
                  isNaN(parseCurrency(fineValue))
                    ? CurrencyFormatter.format(0)
                    : fineValue
                }
                onChange={onFineValueDarj}
                placeholder="R$ 0,00"
                data-test-id="fine-value-darj"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Juros"
                value={
                  isNaN(parseCurrency(interestValue))
                    ? CurrencyFormatter.format(0)
                    : interestValue
                }
                placeholder="R$ 0,00"
                onChange={onInterestValueDarj}
                data-test-id="interest-value-darj"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Taxas"
                value={
                  isNaN(parseCurrency(rateValue))
                    ? CurrencyFormatter.format(0)
                    : rateValue
                }
                placeholder="R$ 0,00"
                onChange={onRateValueDarj}
                data-test-id="rate-value-darj"
              />
            </Grid>
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
                disabled={isValidTotalValue}
                data-test-id="next-button"
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
