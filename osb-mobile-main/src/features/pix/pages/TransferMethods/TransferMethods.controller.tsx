/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { TransferMethodsView } from './TransferMethods.view'
import { AccountRoutes } from 'features/account/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { closeAlert } from 'features/pix/redux/actions'

export const TransferMethods: React.FC = () => {
  const history = useHistory()
  const { loading, errorMessage } = useSelector(
    (state: StoreState) => state.pix,
  )

  const dispatch = useDispatch()

  const onPixKeyClick = React.useCallback(() => {
    history.push(PixRoutes.keyTransfer)
  }, [])

  const onBankDataClick = React.useCallback(() => {
    history.push(PixRoutes.bankDataTransferPayeeName)
  }, [])

  const onCancelButtonClick = React.useCallback(() => {
    history.push(AccountRoutes.home)
  }, [])

  const onAlertClose = React.useCallback(() => {
    dispatch(closeAlert())
  }, [])

  return (
    <TransferMethodsView
      onPixKeyClick={onPixKeyClick}
      onBankDataClick={onBankDataClick}
      onCancelButtonClick={onCancelButtonClick}
      loading={loading}
      errorMessage={errorMessage}
      onAlertClose={onAlertClose}
    />
  )
}
