import React from 'react'
import { useHistory } from 'react-router-dom'
import { WithdrawValueView } from './WithdrawValue.view'
import { AccountRoutes } from 'features/account/constants/routes'
import { useValue } from 'hooks/useValue'
import { casting, maskMoney } from '_utils/masks/money'
import { PixRoutes } from 'features/pix/constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { updatePixOut } from 'features/pix/redux/actions'
import { StoreState } from 'redux/state'

export const WithdrawValue: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [valueInput, setValueInput] = useValue(maskMoney)
  const [disableNextButton, setDisableNextButton] = React.useState(true)
  const pixWithDrawState = useSelector(
    (store: StoreState) => store.pix.pixCashChangeWithdraw,
  )
  const _state = useSelector((state: StoreState) => state)

  const accountBalance = _state.account.dashboard?.balance!
  const pixWithdrawLimit = 500
  const companyName = _state.pix.infosPixQRCode?.receiverName!
  const companyTaxId = _state.pix.infosPixQRCode?.receiverTaxNumber!
  const toCompanyBankName = 'Banco ABC'

  React.useEffect(() => {
    const valueCasting = casting(valueInput)

    setDisableNextButton(
      valueCasting > 0 &&
        valueCasting < accountBalance &&
        valueCasting < pixWithdrawLimit,
    )
  }, [valueInput])

  const onCancelButtonClick = React.useCallback(() => {
    history.replace(AccountRoutes.home)
  }, [])

  const onNextButtonClick = () => {
    dispatch(updatePixOut({ ...pixWithDrawState!, value: valueInput }))
    history.push(PixRoutes.withdrawSummary)
  }

  const onValidateBalance = (resultValidation?: boolean) => {
    setDisableNextButton(resultValidation!)
  }

  const validateBalance = (value: string) => {
    const valueToNumber = casting(value)
    return valueToNumber > accountBalance! || valueToNumber > pixWithdrawLimit
  }

  return (
    <WithdrawValueView
      onCancelButtonClick={onCancelButtonClick}
      valueInput={valueInput}
      setValueInput={setValueInput}
      onNextButtonClick={onNextButtonClick}
      disableNextButton={disableNextButton}
      onValidateBalance={onValidateBalance}
      validateBalance={validateBalance}
      companyName={companyName}
      companyTaxId={companyTaxId}
      toCompanyBankName={toCompanyBankName}
      pixWithdrawLimit={pixWithdrawLimit}
    />
  )
}
