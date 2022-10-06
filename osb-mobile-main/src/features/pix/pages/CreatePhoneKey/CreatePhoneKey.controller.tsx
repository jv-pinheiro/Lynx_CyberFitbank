import React from 'react'
import { useHistory } from 'react-router-dom'
import { AccountRoutes } from 'features/account/constants/routes'
import { useMask } from 'hooks/useMask'
import { CreatePhoneKeyView } from './CreatePhoneKey.view'
import { maskPhone } from '_utils/masks/phone'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { getUserInformation } from 'features/user/redux/actions'
import { closeAlert, createPixKey } from 'features/pix/redux/actions'
import { SuccessPixState } from 'features/pix/redux/state'
import { KeyType } from 'features/pix/redux'
import { PixRoutes } from 'features/pix/constants/routes'

export const CreatePhoneKey: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [phone, setPhone] = useMask(maskPhone)

  const pixState = useSelector((store: StoreState) => store.pix)
  const userInformationState = useSelector(
    (store: StoreState) => store.userInformation,
  )
  const accountState = useSelector((store: StoreState) => store.account)

  const { loading, errorMessage } = pixState
  const { userInformation } = userInformationState
  const { account } = accountState

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
  }

  const onDefineClick = React.useCallback(() => {
    dispatch(createPixKey(KeyType.phone.value, phone))
  }, [phone])

  React.useEffect(() => {
    dispatch(getUserInformation())
  }, [])

  React.useEffect(() => {
    if (userInformation?.phoneNumber) setPhone(userInformation!.phoneNumber)
    else setPhone('')
  }, [userInformation])

  const onAlertClose = () => {
    dispatch(closeAlert())
  }
  const onTaxIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(event.target.value)

  React.useEffect(() => {
    if (pixState instanceof SuccessPixState && phone)
      history.push(PixRoutes.createPhoneKeyConfirmToken)
  }, [pixState])

  return (
    <CreatePhoneKeyView
      onTaxIdChange={onTaxIdChange}
      onDefineClick={onDefineClick}
      onCancelButtonClick={onCancelButtonClick}
      value={phone}
      name={account!.name}
      bank={account!.bank}
      taxId={account!.taxId}
      errorMessage={errorMessage}
      loading={loading}
      onCloseAlert={onAlertClose}
    />
  )
}
