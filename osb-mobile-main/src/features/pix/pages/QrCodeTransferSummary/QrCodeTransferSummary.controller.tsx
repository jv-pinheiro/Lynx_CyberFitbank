import { PixRoutes } from 'features/pix/constants/routes'
import {
  createQrCodePixTransfer,
  updatePixTransfer,
  updateQrCodePix,
} from 'features/pix/redux/actions'
import { SuccessPixState } from 'features/pix/redux/state'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StoreState } from 'redux/state'
import { QrCodeTransferSummaryView } from './QrCodeTransferSummary.view'

export const QrCodeTransferSummary: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const pixState = useSelector((store: StoreState) => store.pix)
  const { infosPixQRCode, pixTransfer, loading, errorMessage } = pixState

  const [pixDate, setPixDate] = React.useState<Date>(new Date())
  const [onShowAlert, setShowAlert] = React.useState(false)
  const [value, setValue] = React.useState(Number)
  const [validatedToken, setValidatedToken] = React.useState(false)
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)

  React.useEffect(() => {
    if (validatedToken && pixState instanceof SuccessPixState)
      history.replace(PixRoutes.transferCompleted)
  })

  React.useEffect(() => {
    setPixDate(infosPixQRCode?.paymentDate ?? new Date())
    setValue(parseFloat(infosPixQRCode?.originalValue!))
  }, [infosPixQRCode])

  const onSubmit = React.useCallback(() => {
    setOpenAuthorizationSheet(true)
  }, [openAuthorizationSheet])

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    history.push(PixRoutes.home)
  }, [pixState])

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    dispatch(
      updateQrCodePix({
        paymentDate: pixDate,
      }),
    )
    if (tokenIsValid) {
      setValidatedToken(true)
      dispatch(createQrCodePixTransfer())
    }
    setOpenAuthorizationSheet(false)
    setShowAlert(true)
  }

  const onClose = () => {
    setShowAlert(false)
  }

  const onClick = () => {
    history.push(PixRoutes.home)
  }

  const onBackButtonClick = () => {
    dispatch(updatePixTransfer())
    history.go(-1)
  }

  return (
    <QrCodeTransferSummaryView
      onSubmit={onSubmit}
      onCancelButtonClick={onCancelButtonClick}
      value={value}
      taxId={infosPixQRCode?.receiverTaxNumber}
      date={pixDate}
      openAuthorizationSheet={openAuthorizationSheet}
      onAuthorizationClose={onAuthorizationClose}
      errorMessage={errorMessage}
      name={infosPixQRCode?.receiverName}
      description={pixTransfer?.description}
      loading={loading}
      open={onShowAlert}
      onClick={onClick}
      onClose={onClose}
      onBackButtonClick={onBackButtonClick}
    />
  )
}
