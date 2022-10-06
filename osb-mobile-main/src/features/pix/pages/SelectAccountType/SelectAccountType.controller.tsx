import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { SelectAccountTypeView } from './SelectAccountType.view'
import { useDispatch, useSelector } from 'react-redux'
import { updatePixTransfer } from 'features/pix/redux/actions'
import { AccountPixType } from 'features/pix/redux/models/enum'
import { StoreState } from 'redux/state'

export const SelectAccountType: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [accountType, setAccountType] = React.useState<
    AccountPixType | undefined
  >()
  const pixState = useSelector((store: StoreState) => store.pix.pixTransfer)
  React.useEffect(() => {
    if (accountType !== undefined) {
      dispatch(
        updatePixTransfer({
          accountType: accountType,
        }),
      )
      history.push(PixRoutes.pixBankBranch)
    }
  }, [accountType, dispatch, history])

  const onCheckingAccountClick = () => {
    setAccountType(AccountPixType.normal)
  }

  const onSavingsAccountClick = () => {
    setAccountType(AccountPixType.savings)
  }

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    history.push(PixRoutes.home)
  }, [])

  return (
    <SelectAccountTypeView
      onCheckingAccountClick={onCheckingAccountClick}
      onSavingsAccountClick={onSavingsAccountClick}
      onCancelButtonClick={onCancelButtonClick}
      name={pixState?.toName}
    />
  )
}
