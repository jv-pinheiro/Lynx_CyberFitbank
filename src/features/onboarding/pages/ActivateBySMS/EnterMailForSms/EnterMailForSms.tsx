import React from 'react'
import { useHistory } from 'react-router-dom'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { TextField } from 'components/TextField'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { Box, Grid } from '@material-ui/core'
import { updateOnboardingForm } from 'features/onboarding/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useStyles } from './EnterMailForSms.style'
import { validateEmail } from '_utils/validate'
import { StoreState } from 'redux/state'

export const EnterMailForSms: React.FC = () => {
  const style = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const [mail, setMail] = React.useState('')
  const [invalidMail, setInvalidMail] = React.useState(false)

  const onboardingSms = useSelector(
    (state: StoreState) => state.onboarding.onboardingForm,
  )

  React.useEffect(() => {
    validateError()
  }, [mail])

  const onTaxIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setMail(event.target.value)

  const onCancelButtonClick = () => {
    history.replace(OnboardingRoutes.activateAccount)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(updateOnboardingForm({ mail }))

    history.push(OnboardingRoutes.birthDateForSMS)
  }

  const validateError = () => {
    validateEmail(mail) ? setInvalidMail(false) : setInvalidMail(true)
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={OnboardingRoutes.welcome}
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
          <ProcessDescriptionHeader
            title="Ative sua Conta"
            subtitle="Email"
            description="Digite seu Email."
          />
        }
        main={
          <React.Fragment>
            <Grid container direction="column">
              <Grid item component="form" className={style.mailInput}>
                <TextField
                  label="Email"
                  error={mail ? invalidMail : false}
                  value={mail}
                  type="email"
                  placeholder="Digite seu Email"
                  onChange={onTaxIdChange}
                  variant="outlined"
                />
                {mail.length > 0 && invalidMail && (
                  <Box className={style.inputError}>E-mail inválido</Box>
                )}
              </Grid>
            </Grid>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                disabled={invalidMail}
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
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
