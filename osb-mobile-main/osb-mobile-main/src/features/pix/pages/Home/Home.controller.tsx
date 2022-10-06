/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { HomeView } from './Home.view'
import { AccountRoutes } from 'features/account/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { SuccessPixState } from 'features/pix/redux/state'
import {
  generateStaticPixQRCode,
  getPixKeys,
  updatePix,
} from 'features/pix/redux/actions'
import { closeAlert } from 'features/onboarding/redux/actions'

export const Home: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [onReceivePixQRCode, setOnReceivePixQRCode] = React.useState(false)
  const { pixKeys } = useSelector((state: StoreState) => state.pix)
  const qrCodeState = useSelector((state: StoreState) => {
    return state.pix
  })

  const { loading, errorMessage } = qrCodeState

  const onTransferWithKeyClick = React.useCallback(() => {
    history.push(PixRoutes.transfer)
  }, [])

  const onCopyPasteTransferClick = React.useCallback(() => {
    history.push(PixRoutes.transfer)
  }, [])

  const onPixKeysClick = React.useCallback(() => {
    history.push(PixRoutes.keys)
  }, [])

  const onReceivePixQRCodeClick = React.useCallback(() => {
    dispatch(updatePix({ ...pixKeys![0], pixTransactionPurpose: 0 }))
    dispatch(generateStaticPixQRCode())
    setOnReceivePixQRCode(true)
  }, [pixKeys])

  React.useEffect(() => {
    dispatch(getPixKeys())
  }, [])

  const onCancelButton = React.useCallback(() => {
    history.push(AccountRoutes.home)
  }, [])

  const onHelpClick = React.useCallback(() => {
    history.push(AccountRoutes.help)
  }, [])
  const onBackToHome = React.useCallback(() => {
    history.push(AccountRoutes.home)
  }, [])

  const onMyLimitsPix = React.useCallback(() => {
    history.push(PixRoutes.pixPaymentLimit)
  }, [])

  React.useEffect(() => {
    if (onReceivePixQRCode && qrCodeState instanceof SuccessPixState)
      history.push(PixRoutes.receivePaymentQRCode)
  }, [history, qrCodeState, onReceivePixQRCode])

  const onAlertClose = () => {
    dispatch(closeAlert())
  }
  return (
    <HomeView
      onTransferWithKeyClick={onTransferWithKeyClick}
      onCopyPasteTransferClick={onCopyPasteTransferClick}
      onPixKeysClick={onPixKeysClick}
      onBackToHome={onBackToHome}
      onReceivePixQRCodeClick={onReceivePixQRCodeClick}
      loading={loading}
      errorMessage={errorMessage}
      onAlertClose={onAlertClose}
      onCancelButton={onCancelButton}
      onHelpClick={onHelpClick}
      onMyLimitsPix={onMyLimitsPix}
    />
  )
}
