import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixChangeValueView } from './PixChangeValue.view'
import { AccountRoutes } from 'features/account/constants/routes'
import { useValue } from 'hooks/useValue'
import { casting, maskMoney } from '_utils/masks/money'
import { PixRoutes } from 'features/pix/constants/routes'
import { updatePixOut } from 'features/pix/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { CurrencyFormatter } from '_translate'

export const PixChangeValue: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [valueInput, setValueInput] = useValue(maskMoney)
  const [disableNextButton, setDisableNextButton] = React.useState(true)
  const pixChangeState = useSelector(
    (store: StoreState) => store.pix.pixCashChangeWithdraw,
  )
  const accountBalance = useSelector(
    (store: StoreState) => store.account.dashboard?.balance!,
  )

  const pixInfosQrCode = useSelector(
    (state: StoreState) => state.pix.infosPixQRCode,
  )

  const pixChangeLimit = 500
  const purchaseValue = Number(pixInfosQrCode?.originalValue!)
  const companyName = pixInfosQrCode?.receiverName!
  const companyTaxId = pixInfosQrCode?.receiverTaxNumber!
  //const toBankName = 'Banco ABC'

  React.useEffect(() => {
    const valueCasting = casting(valueInput)
    setDisableNextButton(
      valueCasting > 0 &&
        valueCasting < accountBalance &&
        valueCasting < pixChangeLimit,
    )
  }, [valueInput])

  const onCancelButtonClick = React.useCallback(() => {
    history.replace(AccountRoutes.home)
  }, [])

  const onNextButtonClick = () => {
    dispatch(updatePixOut({ ...pixChangeState!, value: valueInput }))
    history.push(PixRoutes.pixChangeSummary)
  }

  const onValidateBalance = (resultValidation?: boolean) => {
    setDisableNextButton(resultValidation!)
  }

  const validateBalance = (value: string) => {
    const valueToNumber = casting(value)

    return valueToNumber > accountBalance! || valueToNumber > pixChangeLimit
  }

  return (
    <PixChangeValueView
      onCancelButtonClick={onCancelButtonClick}
      valueInput={valueInput}
      setValueInput={setValueInput}
      onNextButtonClick={onNextButtonClick}
      disableNextButton={disableNextButton}
      onValidateBalance={onValidateBalance}
      validateBalance={validateBalance}
      //toCompanyBankName={toCompanyBankName}
      companyTaxId={companyTaxId}
      companyName={companyName}
      purchaseValue={purchaseValue}
      pixChangeLimit={pixChangeLimit}
    />
  )
}
