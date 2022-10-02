import React from 'react'
import { KeyType } from 'features/pix/redux'
import {
  closeAlert,
  confirmPixKeyHold,
  resendPixKeyToken,
  updatePix,
} from 'features/pix/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { maskPhone } from '_utils/masks/phone'
import { ConfirmTokenPhoneKeyView } from './ConfirmTokenPhoneKey.view'
import { SuccessPixState } from 'features/pix/redux/state'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix/constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'

export const ConfirmTokenPhoneKey: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [token, setToken] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [onShowAlert, setShowAlert] = React.useState(false)
  const [sentRequest, setSentRequest] = React.useState(false)
  const pixState = useSelector((store: StoreState) => store.pix)

  const phoneNumber = useSelector((store: StoreState) => store.userInformation)
  const { selectPix, errorMessage, loading } = pixState

  React.useEffect(() => {
    if (pixState instanceof SuccessPixState && sentRequest) {
      setShowAlert(true)
      dispatch(updatePix())
      history.replace(PixRoutes.keys)
    }
  }, [pixState])

  const subTitle = `Confirmar celular ${phoneNumber.userInformation
    ?.phoneNumber!}`

  const onDefineClick = () => {
    dispatch(
      confirmPixKeyHold(selectPix?.pixKeyValue!, KeyType.phone.value, token),
    )
    setSentRequest(true)
  }

  const onTokenChange = (e: string) => setToken(e)

  const onRedirectAlert = () => history.push(PixRoutes.keys)

  const onCancelButtonClick = () => {
    dispatch(updatePix())
    history.replace(AccountRoutes.home)
  }

  const onCloseAlert = () => {
    setShowAlert(false)
  }

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  const onResendTokenButtonClick = async () => {
    dispatch(resendPixKeyToken(selectPix?.pixKeyType!, selectPix?.pixKeyValue))
    setMessage('Token Reenviado')
  }

  const onBack = () => {
    history.push(PixRoutes.keys)
  }

  return (
    <ConfirmTokenPhoneKeyView
      onTokenChange={onTokenChange}
      value={token}
      onDefineClick={onDefineClick}
      userPixKey={subTitle}
      errorMessage={errorMessage}
      loading={loading}
      onAlertClose={onAlertClose}
      onShowAlert={onShowAlert}
      onCloseAlert={onCloseAlert}
      onClickAlert={onRedirectAlert}
      onCancelButtonClick={onCancelButtonClick}
      message={message}
      onResendTokenButtonClick={onResendTokenButtonClick}
      onBack={onBack}
    />
  )
}
