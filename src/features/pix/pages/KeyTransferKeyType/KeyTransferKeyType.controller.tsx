/* eslint-disable no-control-regex */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { KeyType } from 'features/pix'
import { maskPhone } from '_utils/masks/phone'
import { KeyTransferKeyTypeView } from './KeyTransferKeyType.view'
import { maskTaxPayer } from '_utils/masks/taxPayer'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix/constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'
import { StoreState } from 'redux/state'
import {
  getPixKeyDetails,
  updatePixKeyValue,
  updatePixTransfer,
} from 'features/pix/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { SuccessPixState } from 'features/pix/redux/state'

export const KeyTransferKeyType: React.FC = () => {
  const [keyValue, setKeyValue] = React.useState('')
  const [selectedKeyType, setSelectedKeyType] = React.useState(KeyType.phone)
  const history = useHistory()
  const dispatch = useDispatch()
  const pixState = useSelector((state: StoreState) => state.pix)

  const [validKey, setValidKey] = useState(false)
  const keyIsValid = React.useMemo(() => {
    switch (selectedKeyType) {
      case KeyType.phone:
        return keyValue.length === 16

      case KeyType.taxId:
        return keyValue.length === 14 || keyValue.length === 18

      case KeyType.email:
        const regex = new RegExp(
          /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        )
        return keyValue.length > 0 && regex.test(keyValue)

      case KeyType.random:
        return keyValue.length >= 32
    }
  }, [selectedKeyType, keyValue])

  const validateKey = React.useCallback(() => {
    return keyIsValid
  }, [selectedKeyType, keyValue])

  const onKeyTypeChange = React.useCallback(
    (key: KeyType) => {
      setSelectedKeyType(key)
      setKeyValue('')
    },
    [selectedKeyType],
  )

  const onKeyValueChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      switch (selectedKeyType) {
        case KeyType.phone:
          return setKeyValue(maskPhone(value))

        case KeyType.taxId:
          return setKeyValue(maskTaxPayer(value))

        case KeyType.email:
          return setKeyValue(value)

        case KeyType.random:
          return setKeyValue(value.substring(0, 36))
      }
    },
    [selectedKeyType],
  )

  const onSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!validateKey) return

      dispatch(
        updatePixTransfer({
          pixKey: keyValue,
          pixKeyType: selectedKeyType,
        }),
      )
      dispatch(getPixKeyDetails(keyValue, selectedKeyType.value!))
      setValidKey(true)
      if (pixState instanceof SuccessPixState)
        history.push(PixRoutes.keyTransferPayeeInfo)
    },
    [validateKey],
  )

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    dispatch(updatePixKeyValue())
    history.replace(AccountRoutes.home)
  }, [])

  const onBackButtonClick = React.useCallback(() => {
    dispatch(updatePixTransfer())
    dispatch(updatePixKeyValue())
    history.goBack()
  }, [])

  useEffect(() => {
    if (validKey && pixState instanceof SuccessPixState) {
      history.push(PixRoutes.keyTransferPayeeInfo)
    }
  }, [pixState])

  return (
    <KeyTransferKeyTypeView
      selectedKeyType={selectedKeyType}
      onKeyTypeChange={onKeyTypeChange}
      keyValue={keyValue}
      loading={pixState.loading}
      onKeyValueChange={onKeyValueChange}
      keyIsValid={keyIsValid}
      onSubmit={onSubmit}
      onCancelButtonClick={onCancelButtonClick}
      onBackButtonClick={onBackButtonClick}
    />
  )
}
