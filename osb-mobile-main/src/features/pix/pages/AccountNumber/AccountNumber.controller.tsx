import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { AccountNumberView } from './AccountNumber.view'
import { useMask } from 'hooks/useMask'
import { maskTransference } from '_utils/masks/transferenceNumber'
import { useDispatch } from 'react-redux'
import { updatePixTransfer } from 'features/pix/redux/actions'
export const AccountNumber: React.FC = () => {
  const [accountNumber, setAccountNumber] = useMask(maskTransference)
  const history = useHistory()
  const dispatch = useDispatch()
  const onAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAccountNumber(event.target.value)
  }
  const _splitAccountNumberFromDigit = (): [string, string] => {
    return [
      accountNumber.substring(0, accountNumber.length - 1),
      Array.from(accountNumber).pop()!,
    ]
  }
  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    history.push(PixRoutes.home)
  }, [])
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const [bankAccount, bankAccountDigit] = _splitAccountNumberFromDigit()
    if (accountNumber.length >= 5) {
      dispatch(
        updatePixTransfer({
          toBankAccount: bankAccount,
          toBankAccountDigit: bankAccountDigit,
        }),
      )
      history.push(PixRoutes.pixTransferValue)
    }
  }
  return (
    <AccountNumberView
      onSubmit={onSubmit}
      onCancelButtonClick={onCancelButtonClick}
      onAccountNumberChange={onAccountNumberChange}
      accountNumber={accountNumber}
    />
  )
}
