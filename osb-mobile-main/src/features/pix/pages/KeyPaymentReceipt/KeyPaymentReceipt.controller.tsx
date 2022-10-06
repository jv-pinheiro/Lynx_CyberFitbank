import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { KeyPaymentReceiptView } from './KeyPaymentReceipt.view'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { updatePixTransfer } from 'features/pix/redux/actions'

export const KeyPaymentReceipt: React.FC = () => {
  const { pixState } = useSelector((state: StoreState) => ({
    pixState: state.pix.pixTransfer!,
  }))

  const history = useHistory()
  const dispatch = useDispatch()
  const [pixKeyType, setPixKeyType] = React.useState('')

  React.useEffect(() => {
    setPixKeyType(pixState.pixKeyType?.displayString!)
  }, [pixState])

  const onCloseButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    history.push(PixRoutes.home)
  }, [])

  return (
    <KeyPaymentReceiptView
      onCloseButtonClick={onCloseButtonClick}
      value={pixState.value}
      name={pixState.toName}
      keyType={pixKeyType}
      pixKey={pixState.pixKey}
      taxId={pixState.toTaxId}
      date={pixState.paymentDate}
      description={pixState.description}
    />
  )
}
