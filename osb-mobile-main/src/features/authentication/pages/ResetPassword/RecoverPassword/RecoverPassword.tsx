import React from 'react'
import { Grid } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import {
  SuccessRecoverState,
  RecoverLoadingState,
  ErrorAuthState,
} from 'features/authentication/redux/state'
import { Button } from 'components/Button'
import { StoreState } from 'redux/state'
import { findUserContacts, logout, updateAuthData } from 'features/authentication/redux/actions'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { AccountRoutes } from 'features/account/constants/routes'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { useHistory } from 'react-router-dom'
import { useMask } from 'hooks/useMask'
import { maskCpf } from '_utils/masks/taxPayer'
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardArrowRight } from '@material-ui/icons'
import { nextLabel } from 'constants/buttons/labels'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { TextField } from 'components/TextField'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'

export const RecoverPassword: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [taxIdInput, setCpfInput] = useMask(maskCpf)
  const authState = useSelector((state: StoreState) => state.auth)

  React.useEffect(() => {
    if (authState instanceof SuccessRecoverState)
      history.push(AuthenticationRoutes.sendRecoverPwd)
  }, [authState, history])

  React.useEffect(() => {
    if (authState instanceof ErrorAuthState)
      dispatch(updateAuthData({}))
  }, [])

  const onCpfChange = (event: any) => {
    setCpfInput(event.target.value)
  }

  const onSubmit = async (event: any) => {
    event.preventDefault()
    dispatch(findUserContacts(taxIdInput))
  }

  const isValid = taxIdInput.length === 14 || taxIdInput.length === 18

  const _resetState = () => dispatch(logout())

  return (
    <PageContainer>
      {authState.errorMessage && (
        <Alert
          title="Erro"
          message={authState.errorMessage}
          severity={'error'}
        />
      )}
      <ProcessPageLayout
        //appBar={<AppBar homeRoute={AccountRoutes.home} />}
        header={
          <ProcessDescriptionHeader
            title="Recuperar senha"
            subtitle="Informe seu CPF"
            description="Você receberá uma senha temporária para acessar o aplicativo, essa senha deve ser mudada após o primeiro acesso."
          />
        }
        main={
          <Grid item>
            <TextField
              variant="filled"
              value={taxIdInput}
              inputMode="numeric"
              label="CPF"
              placeholder="Digite apenas números"
              onChange={onCpfChange}
            />
            <Loader open={authState instanceof RecoverLoadingState} />
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
                disabled={!isValid}
              >
                {nextLabel}
              </Button>
            }
            onBackButtonClick={_resetState}
          />
        }
      />
    </PageContainer>
  )
}
