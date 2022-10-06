import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { TransferPayeeNameView } from './TransferPayeeName.view'
import { useMask } from 'hooks/useMask'
import { lettersOnly } from '_utils/masks/generics'
import { useDispatch } from 'react-redux'
import { updatePixTransfer } from 'features/pix/redux/actions'

export const TransferPayeeName: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [toName, setToName] = useMask(lettersOnly)

  const onToNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setToName(event.target.value)

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    history.push(PixRoutes.home)
  }, [])

  const onSubmit = React.useCallback(() => {
    dispatch(
      updatePixTransfer({
        toName: toName,
      }),
    )
    history.push(PixRoutes.bankDataTransferPayeeTaxId)
  }, [toName])

  return (
    <TransferPayeeNameView
      onSubmit={onSubmit}
      onToNameChange={onToNameChange}
      onCancelButtonClick={onCancelButtonClick}
      value={toName}
    />
  )
}
