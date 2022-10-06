import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { TransferValueView } from './TransferValue.view'
import { useDispatch, useSelector } from 'react-redux'
import { getExpectedTransferDate } from 'features/transference/redux/actions'
import { compareTransferDates } from 'features/transference/_utils'
import { parseCurrency, ShortDateFormatter } from '_translate'
import { maskMoney } from '_utils/masks/money'
import { useValue } from 'hooks/useValue'
import { StoreState } from 'redux/state'
import { updatePixTransfer } from 'features/pix/redux/actions'
import { maskTaxId } from '_utils/masks/taxId'

export const TransferValue: React.FC = () => {
  const [transferDate, setTransferDate] = React.useState<Date | null>(null)
  const [displayDate, setDisplayDate] = React.useState('')
  const [minDate, setMinDate] = React.useState<Date>(new Date())
  const [valueInput, setValueInput] = useValue(maskMoney)
  const [taxId, setTaxId] = useValue(maskTaxId)
  const [isValidValue, setIsValidValue] = React.useState(false)
  const [choseDate, setChoseDate] = React.useState(false)
  const [openDatePicker, setOpenDatePicker] = React.useState(false)
  const [balanceIsValid, setBalanceIsValid] = React.useState(Boolean)
  const pixState = useSelector((store: StoreState) => store.pix.pixTransfer)
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    setDisplayDate(_getDisplayDate())
  }, [transferDate])

  React.useEffect(() => {
    setTaxId(pixState?.toTaxId!)
  }, [pixState])

  React.useEffect(() => {
    const parsedValue = parseCurrency(valueInput)
    setIsValidValue(Number.isNaN(parsedValue) || parsedValue <= 0)
  }, [valueInput])

  React.useEffect(() => {
    const convertedValue = casting(valueInput)
    setIsValidValue(convertedValue > 0 && convertedValue <= balance)
    setBalanceIsValid(convertedValue <= balance)
  }, [valueInput])

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    history.push(PixRoutes.home)
  }, [])

  const _getDisplayDate = () => {
    const today = 'Hoje'
    if (!transferDate) return today
    else if (compareTransferDates(transferDate, new Date()) === 0) return today
    else return ShortDateFormatter.format(transferDate)
  }

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
    dispatch(getExpectedTransferDate(date))
    setTransferDate(date)
  }

  const onSubmit = React.useCallback(() => {
    dispatch(
      updatePixTransfer({
        value: parseFloat(parseCurrency(valueInput).toFixed(2)),
        paymentDate: !transferDate ? minDate : transferDate,
      }),
    )
    history.push(PixRoutes.keyTransferMessage)
  }, [valueInput, transferDate, minDate])

  const { balance } = useSelector((store: StoreState) => ({
    balance: store.account.dashboard!.balance,
  }))

  const casting = (valueInString: string) => {
    const valueCents = Number(valueInString.split(',')[1]) / 100 || 0
    return (
      Number(valueInString.split(',')[0].replace(/[^0-9]+/g, '')) + valueCents
    )
  }

  return (
    <TransferValueView
      onCancelButtonClick={onCancelButtonClick}
      onSchedulingButtonClick={onSchedulingButtonClick}
      onDateChange={onDateChange}
      onDatePickerClose={onDatePickerClose}
      isValidValue={isValidValue}
      minDate={minDate}
      displayDate={displayDate}
      choseDate={choseDate}
      openDatePicker={openDatePicker}
      valueInput={valueInput}
      onValueChange={onValueChange}
      onSubmit={onSubmit}
      balanceIsValid={balanceIsValid}
      name={pixState?.toName!}
      taxId={taxId}
      bankBranch={pixState?.toBankBranch!}
      bankAccount={pixState?.toBankAccount}
      bankAccountDigit={pixState?.toBankAccountDigit}
      bankName={pixState?.bankName}
    />
  )
}
