import React from 'react'
import { useHistory } from 'react-router-dom'
import { AccountRoutes } from 'features/account/constants/routes'
import { CreateEmailKeyView } from './CreateEmailKey.view'
import { validateEmail } from '_utils/validate'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { closeAlert, createPixKey } from 'features/pix/redux/actions'
import { getUserInformation } from 'features/user/redux/actions'
import { KeyType } from 'features/pix/redux'
import { PixRoutes } from 'features/pix'
import { SuccessPixState } from 'features/pix/redux/state'

export const CreateEmailKey: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState<boolean>(false)
  const [onShowAlert, setShowAlert] = React.useState(false)

  const pixState = useSelector((store: StoreState) => store.pix)
  const accountState = useSelector((store: StoreState) => store.account)
  const userInformationState = useSelector(
    (store: StoreState) => store.userInformation,
  )
  const { loading, errorMessage } = pixState
  const { userInformation } = userInformationState
  const { account } = accountState

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
  }

  const onCloseAlert = () => {
    setShowAlert(false)
  }

  const onDefineClick = React.useCallback(() => {
    dispatch(createPixKey(KeyType.email.value, email))
    history.push(PixRoutes.createEmailKeyConfirmToken)
  }, [email])

  const validateError = () => {
    if (validateEmail(email)) setError(false)
    else setError(true)
  }

  const onRedirectAlert = () => history.push(PixRoutes.keys)

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value)

  React.useEffect(() => {
    dispatch(getUserInformation())
  }, [])

  React.useEffect(() => {
    if (userInformation?.mail) setEmail(userInformation!.mail)
    else setEmail('')
  }, [userInformation])

  React.useEffect(() => {
    if (pixState instanceof SuccessPixState && email)
      history.push(PixRoutes.createEmailKeyConfirmToken)
  }, [pixState])

  return (
    <CreateEmailKeyView
      validateError={validateError}
      onEmailChange={onEmailChange}
      onDefineClick={onDefineClick}
      onCancelButtonClick={onCancelButtonClick}
      value={email}
      error={error}
      name={account!.name}
      bank={account!.bank}
      taxId={account!.taxId}
      errorMessage={errorMessage}
      onAlertClose={onAlertClose}
      onShowAlert={onShowAlert}
      onCloseAlert={onCloseAlert}
      onClickAlert={onRedirectAlert}
      loading={loading}
    />
  )
}
