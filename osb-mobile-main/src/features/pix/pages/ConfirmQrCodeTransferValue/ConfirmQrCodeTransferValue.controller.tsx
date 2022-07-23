/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { PixRoutes } from 'features/pix'
import { useHistory } from 'react-router-dom'
import { ConfirmQrCodeTransferValueView } from './ConfirmQrCodeTransferValue.view'
import { useValue } from 'hooks/useValue'
import { maskMoney } from '_utils/masks/money'
import { ShortDateFormatter } from '_translate'
import { compareTransferDates } from 'features/transference/_utils'
import { useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { useDispatch } from 'react-redux'
import { updateQrCodePix } from 'features/pix/redux/actions'

export const ConfirmQrCodeTransferValue: React.FC = () => {
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
  const infosQrCode = useSelector(
    (state: StoreState) => state.pix.infosPixQRCode,
  )
  const { balance } = useSelector((store: StoreState) => ({
    balance: store.account.dashboard!.balance,
  }))

  const onNextButtonClick = React.useCallback(() => {
    dispatch(
      updateQrCodePix({
        originalValue: valueInput.replace(/[^0-9,]*/g, '').replace(',', '.'),
        paymentDate: !transferDate ? minDate : transferDate,
      }),
    )
    history.push(PixRoutes.qrCodeTransferMessage)
  }, [valueInput, transferDate, minDate])

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updateQrCodePix())
    history.push(PixRoutes.home)
  }, [])

  const onBackButtonClick = React.useCallback(() => {
    dispatch(updateQrCodePix())
    history.push(PixRoutes.qrCodeTransfer)
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
    <ConfirmQrCodeTransferValueView
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
      payeeName={infosQrCode?.receiverName}
      payeePixKeyValue={infosQrCode?.pixKeyValue}
      onBackButtonClick={onBackButtonClick}
    />
  )
}
