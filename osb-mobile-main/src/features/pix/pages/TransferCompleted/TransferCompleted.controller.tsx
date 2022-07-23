import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { TransferCompletedView } from './TransferCompleted.view'
import { AccountRoutes } from 'features/account/constants/routes'
import { useDispatch } from 'react-redux'
import { updatePixTransfer } from 'features/pix/redux/actions'

export const TransferCompleted: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const onBackButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    history.push(PixRoutes.home)
  }, [])

  const onReceiptButtonClick = () => {
    history.push(PixRoutes.keyPaymentReceipt)
  }

  const onHomeButtonClick = () => {
    dispatch(updatePixTransfer())
    history.replace(AccountRoutes.home)
  }

  return (
    <TransferCompletedView
      onBackButtonClick={onBackButtonClick}
      onReceiptButtonClick={onReceiptButtonClick}
      onHomeButtonClick={onHomeButtonClick}
      onCancelButtonClick={onHomeButtonClick}
    />
  )
}
