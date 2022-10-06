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
import { useDispatch } from 'react-redux'
import { updateFgtsPaymentData } from 'features/taxPayment/redux/actions'
import { useEffect, useState } from 'react'

export const PaymentFgtsValues: React.FC = () => {
  const [principalValue, setPrincipalValue] = useMask(maskMoney)
  const history = useHistory()
  const dispatch = useDispatch()
  const [isValidValue, setIsValidValue] = useState(true)

  const onValueFgts = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrincipalValue(event.target.value)
  }

  const onNextButtonClick = () => {
    dispatch(
      updateFgtsPaymentData({
        principalValue: parseFloat(parseCurrency(principalValue).toFixed(2)),
      }),
    )
    history.push(TaxPaymentRoutes.paymentFgtsDate)
  }

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
    dispatch(updateFgtsPaymentData())
  }

  useEffect(() => {
    setIsValidValue(!parseCurrency(principalValue))
  }, [principalValue])

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
        header={<ProcessDescriptionHeader title="Impostos - FGTS" />}
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
                placeholder="R$ 0,00"
                onChange={onValueFgts}
                data-test-id="value-fgts"
              />
            </Grid>
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                disabled={isValidValue}
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
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
