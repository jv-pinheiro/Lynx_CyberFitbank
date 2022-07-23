/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { PixRoutes } from 'features/pix'
import { useHistory } from 'react-router-dom'
import { KeyTransferValueView } from './KeyTransferValue.view'
import { useValue } from 'hooks/useValue'
import { maskMoney } from '_utils/masks/money'
import { parseCurrency, ShortDateFormatter } from '_translate'
import { compareTransferDates } from 'features/transference/_utils'
import { useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { useDispatch } from 'react-redux'
import { updatePixTransfer } from 'features/pix/redux/actions'

export const KeyTransferValue: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [transferDate, setTransferDate] = React.useState<Date | null>(null)
  const [openDatePicker, setOpenDatePicker] = React.useState(false)
  const [displayDate, setDisplayDate] = React.useState('')
  const [maxDate, setMaxDate] = React.useState<Date>(new Date())
  const [minDate, setMinDate] = React.useState<Date>(new Date())
  const [valueInput, setValueInput] = useValue(maskMoney)
  const [isValidValue, setIsValidValue] = React.useState(false)
  const [balanceIsValid, setBalanceIsValid] = React.useState(Boolean)

  const pixKeyDetails = useSelector(
    (state: StoreState) => state.pix.pixKeyDetails,
  )
  const { balance } = useSelector((store: StoreState) => ({
    balance: store.account.dashboard!.balance,
  }))

  const onNextButtonClick = React.useCallback(() => {
    dispatch(
      updatePixTransfer({
        value: parseFloat(parseCurrency(valueInput).toFixed(2)),
        paymentDate: !transferDate ? minDate : transferDate,
      }),
    )
    history.push(PixRoutes.keyTransferMessage)
  }, [valueInput, transferDate, minDate])

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    history.push(PixRoutes.home)
  }, [])

  const onSchedulingButtonClick = () => {
    setOpenDatePicker(true)
  }

  const onDatePickerClose = () => {
    setOpenDatePicker(false)
  }

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value)
  }

  const onDateChange = (date: Date | null) => {
    setTransferDate(date)
  }

  const _getDisplayDate = () => {
    const today = 'Hoje'

    if (!transferDate) return today
    else if (compareTransferDates(transferDate, new Date()) === 0) return today
    else return ShortDateFormatter.format(transferDate)
  }

  React.useEffect(() => {
    setDisplayDate(_getDisplayDate())
    const today = new Date()
    setMaxDate(today)
  }, [transferDate])

  React.useEffect(() => {
    const convertedValue = casting(valueInput)
    setIsValidValue(convertedValue > 0 && convertedValue <= balance)
    setBalanceIsValid(convertedValue <= balance)
  }, [valueInput])

  const casting = (valueInString: string) => {
    const valueCents = Number(valueInString.split(',')[1]) / 100 || 0
    return (
      Number(valueInString.split(',')[0].replace(/[^0-9]+/g, '')) + valueCents
    )
  }

  return (
    <KeyTransferValueView
      onNextButtonClick={onNextButtonClick}
      valueInput={valueInput}
      isValidValue={isValidValue}
      onValueChange={onValueChange}
      displayDate={displayDate}
      minDate={minDate}
      onDatePickerClose={onDatePickerClose}
      openDatePicker={openDatePicker}
      onSchedulingButtonClick={onSchedulingButtonClick}
      onDateChange={onDateChange}
      _getDisplayDate={_getDisplayDate}
      onCancelButtonClick={onCancelButtonClick}
      balanceIsValid={balanceIsValid}
      payeeName={pixKeyDetails?.payeeName}
      payeePixKeyValue={pixKeyDetails?.pixKeyValue}
    />
  )
}
