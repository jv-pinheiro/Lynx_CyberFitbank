import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { PixChangeSummaryView } from './PixChangeSummary.view'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { createPixOut } from 'features/pix/redux/actions'
import { SuccessPixState } from 'features/pix/redux/state'

export const PixChangeSummary: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const [sentRequest, setSentRequest] = React.useState(false)
  const pixState = useSelector((store: StoreState) => store.pix)

  const changeValue = pixState.pixCashChangeWithdraw?.value
  const companyName = pixState.infosPixQRCode?.receiverName!
  const taxNumber = pixState.infosPixQRCode?.receiverTaxNumber!
  const purchaseValue = Number(pixState.infosPixQRCode?.originalValue!)
  const transactionTotalValue = Number(changeValue) + purchaseValue

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

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(createPixOut())
      setSentRequest(true)
    }
    setOpenAuthorizationSheet(false)
  }

  return (
    <PixChangeSummaryView
      onNextButtonClick={onNextButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      amountChange={changeValue}
      amountPurchase={purchaseValue}
      amountTransaction={transactionTotalValue}
      clientCompanyName={companyName}
      companyTaxId={taxNumber}
      loading={pixState.loading}
      errorMessage={pixState.errorMessage}
      openAuthorizationSheet={openAuthorizationSheet}
      onAuthorizationClose={onAuthorizationClose}
    />
  )
}
