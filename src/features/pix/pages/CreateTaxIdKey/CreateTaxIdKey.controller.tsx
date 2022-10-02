import React from 'react'
import { useHistory } from 'react-router-dom'
import { AccountRoutes } from 'features/account/constants/routes'
import { maskTaxPayer } from '_utils/masks/taxPayer'
import { useMask } from 'hooks/useMask'
import { CreateTaxIdKeyView } from './CreateTaxIdKey.view'
import { KeyType } from 'features/pix/redux'
import { useDispatch, useSelector } from 'react-redux'
import { closeAlert, createPixKey } from 'features/pix/redux/actions'
import { StoreState } from 'redux/state'
import { SuccessPixState } from 'features/pix/redux/state'
import { PixRoutes } from 'features/pix/constants/routes'

export const CreateTaxIdKey: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const pixState = useSelector((store: StoreState) => store.pix)
  const accountState = useSelector((store: StoreState) => store.account)
  const { loading, errorMessage } = pixState
  const { account } = accountState

  const [sentRequest, setSentRequest] = React.useState(false)
  const [taxId, setTaxId] = useMask(maskTaxPayer)
  const [openAuthorizationSheet, setOpenAuthorizationSheet] =
    React.useState(false)
  const [ShowAlert, setShowAlert] = React.useState(false)

  const onCloseAlert = () => {
    setShowAlert(false)
  }

  const onRedirectAlert = () => history.push(PixRoutes.keys)

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
  }

  const onDefineClick = React.useCallback(() => {
    setOpenAuthorizationSheet(true)
  }, [taxId])

  const onAlertClose = () => {
    dispatch(closeAlert())
  }
  const onTaxIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTaxId(event.target.value)

  const onAuthorizationSheetClose = (tokenIsValid: boolean) => {
    const unFormattedTaxId = taxId.replace(/\D+/g, '')
    if (tokenIsValid) {
      dispatch(createPixKey(KeyType.taxId.value, unFormattedTaxId))
    }
    setSentRequest(true)
    setOpenAuthorizationSheet(false)
  }

  React.useEffect(() => {
    if (pixState instanceof SuccessPixState && sentRequest) setShowAlert(true)
  }, [pixState])

  React.useEffect(() => {
    if (account!.taxId) setTaxId(account!.taxId)
    else setTaxId('')
  }, [])

  return (
    <CreateTaxIdKeyView
      openAuthorizationSheet={openAuthorizationSheet}
      onAuthorizationSheetClose={onAuthorizationSheetClose}
      onTaxIdChange={onTaxIdChange}
      onDefineClick={onDefineClick}
      onCancelButtonClick={onCancelButtonClick}
      value={taxId}
      name={account!.name}
      bank={account!.bank}
      onAlertClose={onAlertClose}
      loading={loading}
      errorMessage={errorMessage}
      onShowAlert={ShowAlert}
      onCloseAlert={onCloseAlert}
      onClickAlert={onRedirectAlert}
    />
  )
}
