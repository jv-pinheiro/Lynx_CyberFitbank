import React from 'react'
import { useMask } from 'hooks/useMask'
import { StoreState } from 'redux/state'
import { casting, maskMoney } from '_utils/masks/money'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PixRoutes } from 'features/pix/constants/routes'
import { IncreaseNightlyLimitView } from './IncreaseNightlyLimit.view'
import {
  changeAccountOperationLimit,
  updateAccountLimitList,
} from 'features/pix/redux/actions'
import { AccountOperationLimitType } from 'features/account/redux/models/accountOperationLimitType'

export const IncreaseNightlyLimit: React.FC = () => {
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
    maxLimitValue: store.pix.operationLimits?.limitOverNight!,
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

  const onSubmit = () => {
    setOpenAuthorizationSheet(true)
  }

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(
        changeAccountOperationLimit(
          AccountOperationLimitType.overNight,
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
    <IncreaseNightlyLimitView
      onCancelButtonClick={onCancelButtonClick}
      onSubmit={onSubmit}
      onAuthorizationClose={onAuthorizationClose}
      onAlertClose={onAlertClose}
      onValueChange={onValueChange}
      value={valueInput}
      maxLimitValue={maxLimitValue}
      loading={loading}
      disableNextButton={disableNextButton}
      errorMessage={errorMessage}
      changeOperationLimitSuccessMessage={changeOperationLimitSuccessMessage}
      openAuthorizationSheet={openAuthorizationSheet}
    />
  )
}
