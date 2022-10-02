import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from 'redux/state'
import { createPixOut, updatePixOut } from 'features/pix/redux/actions'
import { SuccessPixState } from 'features/pix/redux/state'
import { ConfirmWithDrawalView } from './ConfirmWithDrawal.view'

export const ConfirmWithDrawal: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const pixState = useSelector((store: StoreState) => store.pix)
  const [sentRequest, setSentRequest] = React.useState(false)
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const withdrawValue = pixState.pixCashChangeWithdraw?.value!

  React.useEffect(() => {
    if (sentRequest && pixState instanceof SuccessPixState)
      history.push(PixRoutes.transferCompleted)
  }, [pixState])

  const onCancelButtonClick = () => {
    history.replace(PixRoutes.home)
  }

  const onNextButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  const onBackButtonClick = () => {
    dispatch(updatePixOut())
    //history.goBack()
  }

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(createPixOut())
      setSentRequest(true)
    }
    setOpenAuthorizationSheet(false)
  }

  return (
    <ConfirmWithDrawalView
      onNextButtonClick={onNextButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      amountChange={withdrawValue}
      clientCompanyName={pixState.infosPixQRCode?.receiverName}
      companyTaxId={pixState.infosPixQRCode?.receiverTaxNumber}
      onBackButtonClick={onBackButtonClick}
      loading={pixState.loading}
      errorMessage={pixState.errorMessage}
      openAuthorizationSheet={openAuthorizationSheet}
      onAuthorizationClose={onAuthorizationClose}
    />
  )
}
