import React from 'react'
import { useHistory } from 'react-router-dom'
import { KeysView } from './Keys.view'
import { PixRoutes } from 'features/pix'
import { StoreState } from 'redux/state'
import {
  cancelPixKey,
  closeAlert,
  getPixKeys,
} from 'features/pix/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { AccountRoutes } from 'features/account/constants/routes'
import { updatePix } from 'features/pix/redux/actions'
import { SuccessPixState } from 'features/pix/redux/state'
import { SelectPixKey } from 'features/pix/redux/models/selectPixKey'
import { PixKeyStatus } from 'features/pix/redux/models/pixKeyStatus'

export const Keys: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const pixState = useSelector((state: StoreState) => state.pix)
  const { pixKeys, loading, errorMessage, selectPix } = pixState
  const [popUpRemoveKeyConfirm, setPopUpRemoveKeyConfirm] =
    React.useState(false)
  const [sentRequest, setSentRequest] = React.useState(false)
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const [showAlert, setShowAlert] = React.useState(false)

  React.useEffect(() => {
    if (pixState instanceof SuccessPixState && sentRequest) setShowAlert(true)
  }, [cancelPixKey])

  React.useEffect(() => {
    if (!popUpRemoveKeyConfirm && !openAuthorizationSheet)
      dispatch(getPixKeys())
  }, [popUpRemoveKeyConfirm])

  const onCloseErrorAlert = () => {
    dispatch(closeAlert())
  }

  const onCloseAlert = () => {
    setShowAlert(false)
  }

  const onClickAlert = () => setShowAlert(false)

  const onAuthorizationClose = (tokenIsValid: boolean) => {
    if (tokenIsValid) {
      dispatch(cancelPixKey(selectPix?.pixKeyValue!, selectPix?.pixKeyType!))
    }
    setSentRequest(true)
    setOpenAuthorizationSheet(false)
    dispatch(getPixKeys())
  }

  const onSelectKeyToDelete = (pix: SelectPixKey) => {
    dispatch(updatePix(pix))
    if (pix?.status === PixKeyStatus.Registering) {
      if (pix.pixKeyType === 2)
        history.push(PixRoutes.createEmailKeyConfirmToken)
      if (pix.pixKeyType === 3)
        history.push(PixRoutes.createPhoneKeyConfirmToken)
    } else {
      setPopUpRemoveKeyConfirm(true)
    }
  }

  const onConfirmDeletion = React.useCallback(() => {
    closeDeletionDrawer()
    setOpenAuthorizationSheet(true)
  }, [])

  const closeDeletionDrawer = () => {
    setPopUpRemoveKeyConfirm(false)
  }

  const onPixKeysTaxIdClick = React.useCallback(() => {
    history.push(PixRoutes.createTaxIdKey)
  }, [])

  const onPixKeysEmailClick = React.useCallback(() => {
    history.push(PixRoutes.createEmailKey)
  }, [])

  const onPixKeysPhoneClick = React.useCallback(() => {
    history.push(PixRoutes.createPhoneKey)
  }, [])

  const onPixKeysRandomClick = React.useCallback(() => {
    history.push(PixRoutes.createRandomKey)
  }, [])

  const onCancelButtonClick = React.useCallback(() => {
    history.push(AccountRoutes.home)
  }, [])

  const onBackButtonClick = React.useCallback(() => {
    dispatch(updatePix())
    history.replace(PixRoutes.home)
  }, [])

  return (
    <KeysView
      onPixKeysTaxIdClick={onPixKeysTaxIdClick}
      onPixKeysEmailClick={onPixKeysEmailClick}
      onPixKeysPhoneClick={onPixKeysPhoneClick}
      onPixKeysRandomClick={onPixKeysRandomClick}
      onCancelButtonClick={onCancelButtonClick}
      onBackButtonClick={onBackButtonClick}
      registeredKeyList={pixKeys}
      loading={loading}
      onSelectKeyToDelete={onSelectKeyToDelete}
      showAlert={showAlert}
      onCloseAlert={onCloseAlert}
      onClickAlert={onClickAlert}
      onCloseErrorAlert={onCloseErrorAlert}
      errorMessage={errorMessage}
      openAuthorizationSheet={openAuthorizationSheet}
      onAuthorizationClose={onAuthorizationClose}
      openPopUpRemoveKeyConfirm={popUpRemoveKeyConfirm}
      closeDeletionDrawer={closeDeletionDrawer}
      onConfirmDeletion={onConfirmDeletion}
    />
  )
}
