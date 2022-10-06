import { PixRoutes } from 'features/pix/constants/routes'
import {
  createPixDataBankTransfer,
  updatePixTransfer,
} from 'features/pix/redux/actions'
import { PixTransfer } from 'features/pix/redux/models/pixTransfer'
import { PixState, SuccessPixState } from 'features/pix/redux/state'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StoreState } from 'redux/state'
import { TransferSummaryView } from './TransferSummary.view'

export const TransferSummary: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [pixState, successPixState, loading, errorMessage] = useSelector<
    StoreState,
    [PixTransfer, PixState, boolean, string | undefined]
  >(state => [
    state.pix.pixTransfer!,
    state.pix,
    state.pix.loading,
    state.pix.errorMessage,
  ])
  const [pixDate, setPixDate] = React.useState<Date>(new Date())
  const [value, setValue] = React.useState(Number)
  const [validatedToken, setValidatedToken] = React.useState(false)
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)

  React.useEffect(() => {
    if (validatedToken && successPixState instanceof SuccessPixState)
      history.replace(PixRoutes.transferCompleted)
  })

  React.useEffect(() => {
    setPixDate(pixState?.paymentDate!)
    setValue(pixState?.value!)
  }, [pixState])

  const onSubmit = React.useCallback(() => {
    setOpenAuthorizationSheet(true)
  }, [openAuthorizationSheet])

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    history.push(PixRoutes.home)
  }, [pixState])

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      setValidatedToken(true)
      dispatch(createPixDataBankTransfer())
    }
    setOpenAuthorizationSheet(false)
  }

  return (
    <TransferSummaryView
      onSubmit={onSubmit}
      onCancelButtonClick={onCancelButtonClick}
      value={value}
      date={pixDate}
      taxId={pixState.toTaxId}
      openAuthorizationSheet={openAuthorizationSheet}
      onAuthorizationClose={onAuthorizationClose}
      errorMessage={errorMessage}
      name={pixState?.toName}
      description={pixState?.description}
      tags={pixState?.tags}
      loading={loading}
    />
  )
}
