import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { BankBranchView } from './BankBranch.view'
import { useMask } from 'hooks/useMask'
import { maskTransference } from '_utils/masks/transferenceNumber'
import { useDispatch } from 'react-redux'
import { updatePixTransfer } from 'features/pix/redux/actions'

export const BankBranch: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [bankBranch, setBankBranch] = useMask(maskTransference)

  const onBankBranchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 4) setBankBranch(event.target.value)
  }

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    history.push(PixRoutes.home)
  }, [])

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (bankBranch.length > 0) {
      dispatch(
        updatePixTransfer({
          toBankBranch: bankBranch,
        }),
      )
      history.push(PixRoutes.pixAccountNumber)
    }
  }

  return (
    <BankBranchView
      onSubmit={onSubmit}
      onCancelButtonClick={onCancelButtonClick}
      onBankBranchChange={onBankBranchChange}
      bankBranch={bankBranch}
    />
  )
}
