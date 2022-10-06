import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { TransferPayeeTaxIdView } from './TransferPayeeTaxId.view'
import { useMask } from 'hooks/useMask'
import { maskTaxPayer } from '_utils/masks/taxPayer'
import { useDispatch } from 'react-redux'
import { updatePixTransfer } from 'features/pix/redux/actions'

export const TransferPayeeTaxId: React.FC = () => {
  const history = useHistory()
  const [taxId, setTaxId] = useMask(maskTaxPayer)
  const dispatch = useDispatch()

  const onTaxIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTaxId(event.target.value)

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    history.push(PixRoutes.home)
  }, [])

  const onSubmit = React.useCallback(() => {
    dispatch(
      updatePixTransfer({
        toTaxId: taxId,
      }),
    )
    history.push(PixRoutes.pixSelectBank)
  }, [taxId])

  return (
    <TransferPayeeTaxIdView
      onSubmit={onSubmit}
      onTaxIdChange={onTaxIdChange}
      onCancelButtonClick={onCancelButtonClick}
      value={taxId}
    />
  )
}
