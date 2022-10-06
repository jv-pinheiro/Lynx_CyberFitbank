import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { CheckPixQrCodeView } from './CheckPixQrCode.view'
import { useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { PixKeyType } from 'features/pix/redux/models/pixKeyType'

export const CheckPixQrCode: React.FC = () => {
  const history = useHistory()

  const onCancelButtonClick = React.useCallback(() => {
    history.push(PixRoutes.home)
  }, [])

  const [pixKeyType, setPixKeyType] = React.useState('')
  const [onSharePixQrCode, setSharePixQrCode] = React.useState(false)
  const [validatedSharePixQrCodeSheet, setSharePixQrCodeSheet] =
    React.useState(false)

  const { pixQRCode, pixQrCodeStatic, selectPix } = useSelector(
    (state: StoreState) => state.pix,
  )

  React.useEffect(() => {
    switch (selectPix) {
      case PixKeyType.CPF === selectPix?.pixKeyType:
        setPixKeyType('CPF')
        break
      case PixKeyType.CNPJ === selectPix?.pixKeyType:
        setPixKeyType('CNPJ')
        break

      case PixKeyType.Email === selectPix?.pixKeyType:
        setPixKeyType('Email')
        break

      case PixKeyType.PhoneNumber === selectPix?.pixKeyType:
        setPixKeyType('Celular')
        break
    }
  }, [selectPix])

  const onBackButtonClick = () => {
    history.push(PixRoutes.home)
  }

  const onSharePixQrCodeClick = React.useCallback(() => {
    setSharePixQrCode(true)
  }, [])

  const onSharePixQrCodeClose = (SharePixQrCodeValid: boolean) => {
    if (SharePixQrCodeValid) setSharePixQrCodeSheet(true)
    setSharePixQrCode(false)
  }

  return (
    <CheckPixQrCodeView
      onBackButtonClick={onBackButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      qrCodeBase64={pixQRCode?.qrCodeBase64}
      value={pixQrCodeStatic?.principalValue!}
      payeePixKeyValue={selectPix?.pixKeyValue}
      onSharePixQrCodeClick={onSharePixQrCodeClick}
      onSharePixQrCode={onSharePixQrCode}
      onSharePixQrCodeClose={onSharePixQrCodeClose}
      pixKeyType={pixKeyType}
    />
  )
}
