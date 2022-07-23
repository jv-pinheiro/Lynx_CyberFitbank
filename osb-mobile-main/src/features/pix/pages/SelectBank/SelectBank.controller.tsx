import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { SelectBankView } from './SelectBank.view'
import { listBanksPix, updatePixTransfer } from 'features/pix/redux/actions'
import { Banks } from 'features/pix/redux/models/banks'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { PixTransfer } from 'features/pix/redux/models/pixTransfer'

export const SelectBank: React.FC = () => {
  const [toBank, setToBank] = React.useState('')
  const [toBankName, setToBankName] = React.useState('')
  const [disableNextButton, setDisableNextButton] = React.useState(false)
  const [banks, pixState, loading, errorMessage] = useSelector<
    StoreState,
    [Banks[] | undefined, PixTransfer, boolean, string | undefined]
  >(state => [
    state.pix.banks,
    state.pix.pixTransfer!,
    state.pix.loading,
    state.pix.errorMessage,
  ])
  const history = useHistory()
  const dispatch = useDispatch()
  const [displayBanks, setDisplayBanks] = React.useState(banks)
  React.useEffect(() => {
    dispatch(listBanksPix())
  }, [])
  React.useEffect(() => {
    setDisplayBanks(banks)
  }, [banks])
  React.useEffect(() => {
    if (toBank.length === 0) setDisableNextButton(true)
    else setDisableNextButton(false)
  }, [toBank])
  const _search = (value: string) => {
    value = value.replace(/^\s+|\s+$/, '').toLowerCase()
    const result = banks?.filter(
      bank =>
        bank.code.includes(value.replace(/^0/, '')) ||
        bank.name.toLowerCase().includes(value),
    )
    setDisplayBanks(result)
  }
  const onBankClick = (bank: Banks) => {
    setToBank(bank.code)
    setToBankName(bank.name)
  }
  const onNextButtonClick = () => {
    dispatch(updatePixTransfer({ toBank: toBank, bankName: toBankName }))
    history.push(PixRoutes.pixSelectAccountType)
  }
  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    history.push(PixRoutes.home)
  }, [])

  return (
    <SelectBankView
      onNextButtonClick={onNextButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      disableNextButton={disableNextButton}
      toBank={toBank}
      _search={_search}
      name={pixState?.toName}
      displayBanks={displayBanks}
      onBankClick={onBankClick}
      loading={loading}
      errorMessage={errorMessage}
    />
  )
}
