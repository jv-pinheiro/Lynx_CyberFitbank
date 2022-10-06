import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { useDispatch, useSelector } from 'react-redux'
import { parseCurrency } from '_translate'
import { maskMoney } from '_utils/masks/money'
import { useValue } from 'hooks/useValue'
import { StoreState } from 'redux/state'
import {
  generateStaticPixQRCode,
  updateStaticPixQRCode,
} from 'features/pix/redux/actions'
import { SuccessPixState } from 'features/pix/redux/state'
import { closeAlert } from 'features/onboarding/redux/actions'
import { ReceivePixQrCodeValueView } from './ReceivePixQrCodeValue.view'

export const ReceivePixQrCodeValue: React.FC = () => {
  const [valueInput, setValueInput] = useValue(maskMoney)
  const [isValidValue, setIsValidValue] = React.useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const [onNextPixQRCode, setOnNextPixQRCode] = React.useState(false)
  const [optionalIdentifier, setOptionalIdentifier] = React.useState('')

  const [description, setDescription] = React.useState('')
  const [onHelpPixQRCode, setHelpPixQRCode] = React.useState(false)
  const [validatedHelpPixQRCodeSheet, setHelpPixQRCodeSheet] =
    React.useState(false)

  const pixQrCodeStatic = useSelector(
    (state: StoreState) => state.pix.pixQrCodeStatic,
  )

  const { selectPix } = useSelector((state: StoreState) => state.pix)

  React.useEffect(() => {
    const parsedValue = parseCurrency(valueInput)
    setIsValidValue(Number.isNaN(parsedValue) || parsedValue <= 0)
  }, [valueInput])

  const onDoubtClick = React.useCallback(() => {
    history.push(PixRoutes.keyTransferMessage)
  }, [])

  const { balance } = useSelector((store: StoreState) => ({
    balance: store.account.dashboard!.balance,
  }))

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

  const [balanceIsValid, setBalanceIsValid] = React.useState<boolean>()

  const condition = balanceIsValid

  const Identifier = [
    { id: '0', value: 'Compra ou transferência' },
    { id: '1', value: 'Retirar' },
    { id: '2', value: 'Compra com troco' },
  ]

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value)

  const onIdentifierChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setOptionalIdentifier(event.target.value)

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value)
  }
  const onHelpClick = React.useCallback(() => {
    setHelpPixQRCode(true)
  }, [])

  const onHelpPixQRCodeClose = (HelpPixQRCodeValid: boolean) => {
    if (HelpPixQRCodeValid) setHelpPixQRCodeSheet(true)
    setHelpPixQRCode(false)
  }

  const qrCodeState = useSelector((state: StoreState) => {
    return state.pix
  })

  const { loading, errorMessage } = qrCodeState

  React.useEffect(() => {
    if (onNextPixQRCode && qrCodeState instanceof SuccessPixState) {
      history.push(PixRoutes.checkPixQRCode)
    }
  }, [history, onNextPixQRCode, qrCodeState])

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  const onSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setOnNextPixQRCode(true)
      dispatch(
        updateStaticPixQRCode({
          ...pixQrCodeStatic,
          additionalData: description,
          pixTransactionPurpose: Number(optionalIdentifier),
          principalValue: casting(valueInput),
        }),
      )
      dispatch(
        generateStaticPixQRCode({
          additionalData: description,
          pixTransactionPurpose: Number(optionalIdentifier),
          principalValue: casting(valueInput),
        }),
      )
    },
    [pixQrCodeStatic, dispatch, description, optionalIdentifier, valueInput],
  )

  React.useEffect(() => {
    setIsValidValue(!valueInput)
  }, [])

  const onCancelButtonClick = React.useCallback(() => {
    history.replace(PixRoutes.home)
  }, [])

  return (
    <ReceivePixQrCodeValueView
      onValueChange={onValueChange}
      onCancelButtonClick={onCancelButtonClick}
      isValidValue={isValidValue}
      valueInput={valueInput}
      onSubmit={onSubmit}
      balanceIsValid={condition}
      onDescriptionChange={onDescriptionChange}
      description={description}
      onIdentifierChange={onIdentifierChange}
      onDoubtClick={onDoubtClick}
      onHelpClick={onHelpClick}
      onHelpPixQRCode={onHelpPixQRCode}
      onHelpPixQRCodeClose={onHelpPixQRCodeClose}
      loading={loading}
      errorMessage={errorMessage}
      onAlertClose={onAlertClose}
      Identifier={Identifier}
      optionalIdentifier={optionalIdentifier}
      pixKeyType={selectPix?.pixKeyType}
      payeeValue={selectPix?.pixKeyValue}
    />
  )
}
