import { PixRoutes } from 'features/pix/constants/routes'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { KeyTransferSummaryView } from './KeyTransferSummary.view'
import { StoreState } from 'redux/state'
import { PixState, SuccessPixState } from 'features/pix/redux/state'
import { PixTransfer } from 'features/pix/redux/models/pixTransfer'
import { PixKeysDetails } from 'features/pix/redux/models/response/pixKeysDetailsResponse'
import {
  createPixTransfer,
  updatePixTransfer,
} from 'features/pix/redux/actions'

export const KeyTransferSummary: React.FC = () => {
  const [pixState, successPixState, pixKey, loading, errorMessage] =
    useSelector<
      StoreState,
      [PixTransfer, PixState, PixKeysDetails, boolean, string | undefined]
    >(state => [
      state.pix.pixTransfer!,
      state.pix,
      state.pix.pixKeyDetails!,
      state.pix.loading,
      state.pix.errorMessage,
    ])
  const history = useHistory()
  const dispatch = useDispatch()
  const [pixDate, setPixDate] = React.useState<Date>(new Date())
  const [value, setValue] = React.useState(Number)
  const [validatedToken, setValidatedToken] = React.useState(false)
  const [pixKeyType, setPixKeyType] = React.useState('')
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  React.useEffect(() => {
    if (validatedToken && successPixState instanceof SuccessPixState) {
      history.replace(PixRoutes.transferCompleted)
    }
  })

  React.useEffect(() => {
    setPixKeyType(pixState.pixKeyType?.displayString!)
  }, [pixState])

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
      dispatch(createPixTransfer())
    }
    setOpenAuthorizationSheet(false)
  }
  return (
    <KeyTransferSummaryView
      onSubmit={onSubmit}
      onCancelButtonClick={onCancelButtonClick}
      value={value}
      date={pixDate}
      openAuthorizationSheet={openAuthorizationSheet}
      onAuthorizationClose={onAuthorizationClose}
      errorMessage={errorMessage}
      name={pixKey.payeeName}
      description={pixState?.description}
      tags={pixState?.tags}
      loading={loading}
      pixKeyType={pixKeyType}
      pixKey={pixState.pixKey}
      taxId={pixKey.payeeTaxNumber}
    />
  )
}
