import React from 'react'
import { useMask } from 'hooks/useMask'
import { StoreState } from 'redux/state'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { NighltyLimitView } from './NightlyLimit.view'
import { casting, maskMoney } from '_utils/masks/money'
import { PixRoutes } from 'features/pix/constants/routes'
import { updateAccountLimitList } from 'features/pix/redux/actions'

export const NightlyLimit: React.FC = () => {
  const valueAlreadySpent = 0
  const permittedLimitNumber = useSelector(
    (store: StoreState) => store.pix.operationLimits?.limitOverNight!,
  )
  const [valueInput, setValueInput] = useMask(maskMoney)
  const availableValue = permittedLimitNumber - valueAlreadySpent
  const history = useHistory()
  const dispatch = useDispatch()

  const onCancelButtonClick = () => {
    dispatch(updateAccountLimitList())
    history.replace(PixRoutes.pixPaymentLimit)
  }

  React.useEffect(() => {
    if (valueInput === '') return

    if (valueInput.includes('NaN')) setValueInput('0')

    let valueToNumber = casting(valueInput)

    if (valueToNumber >= permittedLimitNumber) {
      setValueInput(Math.floor(permittedLimitNumber * 100).toString())
    }

    if (valueToNumber < valueAlreadySpent) {
      setValueInput(Math.floor(valueAlreadySpent * 100).toString())
    }
  }, [valueInput])

  const limitIncreaseOnClickButton = () => {
    history.push(PixRoutes.increaseNightlyLimit)
  }

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.currentTarget.value)
  }
  return (
    <NighltyLimitView
      onCancelButtonClick={onCancelButtonClick}
      valueInput={valueInput}
      onValueChange={onValueChange}
      permittedLimitNumber={permittedLimitNumber}
      availableValue={availableValue}
      limitIncreaseOnClickButton={limitIncreaseOnClickButton}
      setValueInput={setValueInput}
    />
  )
}
