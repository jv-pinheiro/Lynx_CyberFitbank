/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { QrCodeTransferCardView } from './QrCodeTransferCard.view'

export const QrCodeTransferCard: React.FC = () => {
  const history = useHistory()

  const onQrCodeTransferClick = React.useCallback(() => {
    history.replace(PixRoutes.qrCodeTransfer)
  }, [])

  return (
    <QrCodeTransferCardView onQrCodeTransferClick={onQrCodeTransferClick} />
  )
}
