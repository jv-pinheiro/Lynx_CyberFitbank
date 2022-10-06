/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { KeyTransferPayeeInfoView } from './KeyTransferPayeeInfo.view'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { updatePixTransfer } from 'features/pix/redux/actions'
import { maskTaxId } from '_utils/masks/taxId'
import { updatePixKeyValue as updatePixKeyValue } from 'features/pix/redux/actions'

export const KeyTransferPayeeInfo: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { pixKeyDetails, loading, errorMessage } = useSelector(
    (state: StoreState) => state.pix,
  )

  const pixKeyType = Number(pixKeyDetails?.pixKeyType!)
  const onNextButtonClick = React.useCallback(() => {
    history.push(PixRoutes.keyTransferValue)
  }, [])

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    dispatch(updatePixKeyValue())
    history.push(PixRoutes.home)
  }, [])

  const payeePixKeyValueText =
    pixKeyType === 0
      ? `CPF: ${maskTaxId(pixKeyDetails?.pixKeyValue!)}`
      : pixKeyType === 1
      ? `CNPJ: ${maskTaxId(pixKeyDetails?.pixKeyValue!)}`
      : pixKeyType === 2
      ? `E-mail: ${pixKeyDetails?.pixKeyValue}`
      : pixKeyType === 3
      ? `Telefone: ${pixKeyDetails?.pixKeyValue}`
      : `Chave Aleatória: ${pixKeyDetails?.pixKeyValue}`

  return (
    <KeyTransferPayeeInfoView
      onNextButtonClick={onNextButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      payeeName={pixKeyDetails?.payeeName ?? '---'}
      payeePixKeyValueText={
        !pixKeyDetails?.payeeTaxNumber
          ? '---'
          : `CPF: ${maskTaxId(pixKeyDetails?.payeeTaxNumber)}`
      }
      loading={loading}
      errorMessage={errorMessage}
      disabled={!pixKeyDetails?.pixKeyValue}
    />
  )
}
