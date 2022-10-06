import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { QrCodeTransferView } from './QrCodeTransfer.view'
import { useDispatch, useSelector } from 'react-redux'
import { GetInfoPixQRCode, updatePix } from 'features/pix/redux/actions'
import { StoreState } from 'redux/state'
import { SuccessPixState } from 'features/pix/redux/state'
import { closeAlert } from 'features/onboarding/redux/actions'
import { PixTransactionPurpose } from 'features/pix/redux/models/response/enum'

export const QrCodeTransfer: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const pixState = useSelector((state: StoreState) => state.pix)
  const onCancelButtonClick = React.useCallback(() => {
    history.push(PixRoutes.home)
  }, [])
  const { infosPixQRCode, errorMessage, loading } = pixState

  const onScanComplete = (hash: string | null) => {
    if (!!hash) {
      dispatch(GetInfoPixQRCode(hash))
    }
  }

  const onScanFail = (e: any) => {}

  React.useEffect(() => {
    dispatch(updatePix())
  }, [])

  React.useEffect(() => {
    if (pixState instanceof SuccessPixState && infosPixQRCode) {
      if (!pixState.infosPixQRCode?.originalValue) {
        history.push(PixRoutes.confirmQrCodeTransferValue)
      }
      if (!!pixState.infosPixQRCode?.originalValue) {
        Number(pixState.infosPixQRCode?.status) ===
        PixTransactionPurpose.Withdraw
          ? history.push(PixRoutes.withdrawValue)
          : Number(pixState.infosPixQRCode?.status) ===
            PixTransactionPurpose.PurchaseWithChange
          ? history.push(PixRoutes.pixChangeValue)
          : history.push(PixRoutes.qrCodeTransferSummary)
      }
    }
  }, [pixState])

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  const onBackPage = () => {
    history.push(PixRoutes.home)
  }

  return (
    <QrCodeTransferView
      onCancelButtonClick={onCancelButtonClick}
      onScanComplete={onScanComplete}
      onScanFail={onScanFail}
      onAlertClose={onAlertClose}
      errorMessage={errorMessage}
      loading={loading}
      onBackPage={onBackPage}
    />
  )
}
