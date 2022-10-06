import React from 'react'
import { useMask } from 'hooks/useMask'
import { StoreState } from 'redux/state'
import { casting, maskMoney } from '_utils/masks/money'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PixRoutes } from 'features/pix/constants/routes'
import { IncreaseTotalDailyLimitView } from './IncreaseTotalDailyLimit.view'
import {
  changeAccountOperationLimit,
  updateAccountLimitList,
} from 'features/pix/redux/actions'
import { AccountOperationLimitType } from 'features/account/redux/models/accountOperationLimitType'
import { CurrencyFormatter, parseCurrency } from '_translate'

export const IncreaseTotalDailyLimit: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [valueInput, setValueInput] = useMask(maskMoney)
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const {
    maxLimitValue,
    loading,
    errorMessage,
    changeOperationLimitSuccessMessage,
  } = useSelector((store: StoreState) => ({
    maxLimitValue: store.pix.operationLimits?.limitDaily!,
    loading: store.pix.loading,
    errorMessage: store.pix.errorMessage,
    changeOperationLimitSuccessMessage:
      store.pix.changeOperationLimitSuccessMessage,
  }))

  React.useEffect(() => {
    if (!casting(valueInput)) {
      setDisableNextButton(true)
      return
    }
    setDisableNextButton(false)
  }, [valueInput])

  const onCancelButtonClick = () => {
    dispatch(updateAccountLimitList())
    history.replace(PixRoutes.pixPaymentLimit)
  }

  const onNextButtonClick = () => {
    setOpenAuthorizationSheet(true)
  }

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(
        changeAccountOperationLimit(
          AccountOperationLimitType.daily,
          casting(valueInput),
        ),
      )
    }
    setOpenAuthorizationSheet(false)
  }

  const onAlertClose = () => {
    dispatch(updateAccountLimitList())
    history.push(PixRoutes.pixPaymentLimit)
  }

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.currentTarget.value)
  }

  return (
    <IncreaseTotalDailyLimitView
      onAuthorizationClose={onAuthorizationClose}
      onAlertClose={onAlertClose}
      maxLimitValue={maxLimitValue}
      loading={loading}
      disableNextButton={disableNextButton}
      errorMessage={errorMessage}
      changeOperationLimitSuccessMessage={changeOperationLimitSuccessMessage}
      openAuthorizationSheet={openAuthorizationSheet}
      value={valueInput}
      onCancelButtonClick={onCancelButtonClick}
      onValueChange={onValueChange}
      onNextButtonClick={onNextButtonClick}
    />
  )
}
