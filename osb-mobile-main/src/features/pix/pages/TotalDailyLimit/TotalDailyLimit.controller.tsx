import React from 'react'
import { useMask } from 'hooks/useMask'
import { StoreState } from 'redux/state'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { casting, maskMoney } from '_utils/masks/money'
import { PixRoutes } from 'features/pix/constants/routes'
import { TotalDailyLimitView } from './TotalDailyLimit.view'
import { updateAccountLimitList } from 'features/pix/redux/actions'

export const TotalDailyLimit: React.FC = () => {
  const valueAlreadySpent = 0
  const permittedLimitNumber = useSelector(
    (store: StoreState) => store.pix.operationLimits?.limitDaily!,
  )

  const [valueInput, setValueInput] = useMask(maskMoney)
  const availableValue = permittedLimitNumber - valueAlreadySpent
  const history = useHistory()
  const dispatch = useDispatch()

  const onCloseButtonClick = () => {
    dispatch(updateAccountLimitList())
    history.push(PixRoutes.pixPaymentLimit)
  }

  React.useEffect(() => {
    let valueToNumber = casting(valueInput)

    if (valueToNumber >= permittedLimitNumber) {
      setValueInput(Math.floor(permittedLimitNumber * 100).toString())
    }

    if (valueToNumber <= valueAlreadySpent) {
      setValueInput(Math.floor(valueAlreadySpent * 100).toString())
    }
  }, [valueInput])

  const limitIncreaseOnClickButton = () => {
    history.push(PixRoutes.increaseTotalDailyLimit)
  }

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.currentTarget.value)
  }

  return (
    <TotalDailyLimitView
      onCloseButtonClick={onCloseButtonClick}
      valueInput={valueInput}
      availableValue={availableValue}
      permittedLimitNumber={permittedLimitNumber}
      limitIncreaseOnClickButton={limitIncreaseOnClickButton}
      setValueInput={setValueInput}
      onValueChange={onValueChange}
    />
  )
}
