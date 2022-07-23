import React from 'react'
import { useHistory } from 'react-router-dom'
import { AccountRoutes } from 'features/account/constants/routes'
import { CreateRandomKeyView } from './CreateRandomKey.view'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { PixRoutes } from 'features/pix/constants/routes'
import { closeAlert, createPixKey } from 'features/pix/redux/actions'
import { KeyType } from 'features/pix/redux'

export const CreateRandomKey: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)

  const [onShowAlert, setShowAlert] = React.useState(false)
  const pixState = useSelector((store: StoreState) => store.pix)
  const accountState = useSelector((store: StoreState) => store.account)
  const { loading, errorMessage } = pixState
  const { account } = accountState

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
  }

  const onCloseAlert = () => {
    setShowAlert(false)
  }

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  const onRedirectAlert = () => history.replace(PixRoutes.keys)

  const onDefineClick = React.useCallback(() => {
    setOpenAuthorizationSheet(true)
  }, [])

  const onAuthorizationSheetClose = (tokenIsValid: boolean) => {
    setOpenAuthorizationSheet(false)
    tokenIsValid && dispatch(createPixKey(KeyType.random.value))
  }

  return (
    <CreateRandomKeyView
      onDefineClick={onDefineClick}
      onCancelButtonClick={onCancelButtonClick}
      onAlertClose={onAlertClose}
      loading={loading}
      errorMessage={errorMessage}
      onShowAlert={onShowAlert}
      onCloseAlert={onCloseAlert}
      onClickAlert={onRedirectAlert}
      openAuthorizationSheet={openAuthorizationSheet}
      onAuthorizationSheetClose={onAuthorizationSheetClose}
      name={account!.name}
      bank={account!.bank}
      taxId={account!.taxId}
    />
  )
}
