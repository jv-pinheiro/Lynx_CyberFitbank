import React from 'react'
import { PixRoutes } from 'features/pix/constants/routes'
import {
  closeAlert,
  confirmPixKeyHold,
  resendPixKeyToken,
  updatePix,
} from 'features/pix/redux/actions'
import { KeyType } from 'features/pix/redux/models'
import { SuccessPixState } from 'features/pix/redux/state'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StoreState } from 'redux/state'
import { ConfirmTokenEmailKeyView } from './ConfirmTokenEmailKey.view'
import { AccountRoutes } from 'features/account/constants/routes'

export const ConfirmTokenEmailKey: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [token, setToken] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [onShowAlert, setShowAlert] = React.useState(false)
  const [sentRequest, setSentRequest] = React.useState(false)
  const pixState = useSelector((store: StoreState) => store.pix)
  const { selectPix, errorMessage, loading } = pixState

  const subTitle = `Confirmar e-mail ${selectPix?.pixKeyValue}`

  React.useEffect(() => {
    if (pixState instanceof SuccessPixState && sentRequest) {
      setShowAlert(true)
      dispatch(updatePix())
      history.replace(PixRoutes.keys)
    }
  }, [pixState])

  React.useEffect(() => {
    onResendTokenButtonClick()
  }, [])

  const onDefineClick = () => {
    dispatch(
      confirmPixKeyHold(selectPix?.pixKeyValue!, KeyType.email.value, token),
    )
    setSentRequest(true)
  }

  const onCancelButtonClick = () => {
    dispatch(updatePix())
    history.replace(AccountRoutes.home)
  }

  const onTokenChange = (e: string) => setToken(e)

  const onRedirectAlert = () => history.push(PixRoutes.keys)

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

  return (
    <ConfirmTokenEmailKeyView
      onTokenChange={onTokenChange}
      value={token}
      userPixKey={subTitle}
      onDefineClick={onDefineClick}
      errorMessage={errorMessage}
      loading={loading}
      onAlertClose={onAlertClose}
      onShowAlert={onShowAlert}
      onCloseAlert={onCloseAlert}
      onClickAlert={onRedirectAlert}
      onCancelButtonClick={onCancelButtonClick}
      message={message}
      onResendTokenButtonClick={onResendTokenButtonClick}
    />
  )
}
