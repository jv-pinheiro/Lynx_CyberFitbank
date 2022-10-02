import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { ReceivePaymentQrCodeView } from './ReceivePaymentQrCode.view'
import { SelectPixKey } from 'features/pix/redux/models/selectPixKey'
import { updatePix, updateStaticPixQRCode } from 'features/pix/redux/actions'

export const ReceivePaymentQrCode: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { pixKeys, selectPix } = useSelector((state: StoreState) => state.pix)

  const [onSharePixQrCode, setSharePixQrCode] = React.useState(false)
  const [validatedSharePixQrCodeSheet, setSharePixQrCodeSheet] =
    React.useState(false)

  const [onPixKeySelection, setPixKeySelection] = React.useState(false)
  const [validatedPixKeySelectionSheet, setPixKeySelectionSheet] =
    React.useState(false)

  const onCancelButtonClick = React.useCallback(() => {
    history.push(PixRoutes.home)
  }, [])

  const { qrCodeBase64 } = useSelector((state: StoreState) => ({
    qrCodeBase64: state.pix.pixQRCode?.qrCodeBase64,
  }))

  const onBackButtonClick = () => {
    dispatch(updatePix())
    dispatch(updateStaticPixQRCode())
    history.push(PixRoutes.home)
  }

  const onSetValue = React.useCallback(() => {
    history.push(PixRoutes.receivePixQRCodeValue)
  }, [])

  const onSharePixQrCodeClick = React.useCallback(() => {
    setSharePixQrCode(true)
  }, [])

  const onSharePixQrCodeClose = (SharePixQrCodeValid: boolean) => {
    if (SharePixQrCodeValid) setSharePixQrCodeSheet(true)
    setSharePixQrCode(false)
  }

  const onPixKeySelectionClick = React.useCallback(() => {
    setPixKeySelection(true)
  }, [])

  const onPixKeySelectionClose = (PixKeySelectionValid: boolean) => {
    if (PixKeySelectionValid) setPixKeySelectionSheet(true)
    setPixKeySelection(false)
  }

  const onKeyClick = (pix: SelectPixKey) => {
    dispatch(updatePix(pix))
  }

  return (
    <ReceivePaymentQrCodeView
      onBackButtonClick={onBackButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      qrCodeBase64={qrCodeBase64}
      onSetValue={onSetValue}
      onSharePixQrCodeClick={onSharePixQrCodeClick}
      onSharePixQrCode={onSharePixQrCode}
      onSharePixQrCodeClose={onSharePixQrCodeClose}
      onPixKeySelectionClick={onPixKeySelectionClick}
      onPixKeySelection={onPixKeySelection}
      onPixKeySelectionClose={onPixKeySelectionClose}
      onKeyClick={onKeyClick}
      registeredKeyList={pixKeys}
      pixKeyDetails={selectPix}
    />
  )
}
