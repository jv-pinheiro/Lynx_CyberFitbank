import React from 'react'
import { StoreState } from 'redux/state'
import { useHistory } from 'react-router-dom'
import { CurrencyFormatter } from '_translate'
import { useDispatch, useSelector } from 'react-redux'
import { PixRoutes } from 'features/pix/constants/routes'
import {
  getAccountOperationLimitList,
  updateAccountLimitList,
} from 'features/pix/redux/actions'
import { PixPaymentLimitView } from './PixPaymentLimit.view'
import { AccountOperationLimitType } from 'features/account/redux/models/accountOperationLimitType'
import { Store } from '@material-ui/icons'
import { SuccessPixState } from 'features/pix/redux/state'

export const PixPaymentLimit: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { loading, errorMessage, accountOperationLimitList } = useSelector(
    (store: StoreState) => store.pix,
  )
  const _state = useSelector((state: StoreState) => state.pix)
  const [openChooseLimitPopup, setOpenChooseLimitPopup] = React.useState(false)
  const [maxLimitDaily, setMaxLimitDaily] = React.useState(String)
  const [maxLimitNightly, setMaxLimitNightly] = React.useState(String)
  const [maxLimitTransaction, setMaxLimitTransaction] = React.useState(String)

  React.useEffect(() => {
    dispatch(getAccountOperationLimitList())
  }, [])

  React.useEffect(() => {
    if (accountOperationLimitList?.length === 0) {
      setMaxLimitDaily(CurrencyFormatter.format(0))
      setMaxLimitNightly(CurrencyFormatter.format(0))
      setMaxLimitTransaction(CurrencyFormatter.format(0))
    }
  }, [accountOperationLimitList])

  React.useEffect(() => {
    if (_state instanceof SuccessPixState) {
      accountOperationLimitList?.map(list => {
        list.type === AccountOperationLimitType.daily
          ? setMaxLimitDaily(CurrencyFormatter.format(list.maxValue))
          : list.type === AccountOperationLimitType.overNight
          ? setMaxLimitNightly(CurrencyFormatter.format(list.maxValue))
          : setMaxLimitTransaction(CurrencyFormatter.format(list.maxValue))
      })
    }
  }, [accountOperationLimitList])

  const onCloseButtonClick = () => {
    history.push(PixRoutes.home)
  }

  const onButtonOpenPopupClick = () => {
    setOpenChooseLimitPopup(true)
  }

  const onClosePopup = () => {
    setOpenChooseLimitPopup(false)
  }

  const _reset = () => {
    dispatch(updateAccountLimitList())
    history.push(PixRoutes.home)
  }

  return (
    <PixPaymentLimitView
      onCloseButtonClick={onCloseButtonClick}
      onButtonOpenPopupClick={onButtonOpenPopupClick}
      onClosePopup={onClosePopup}
      onBackButtonClick={_reset}
      maxLimitDailyFormatted={maxLimitDaily}
      maxLimitNightlyFormatted={maxLimitNightly}
      maxLimitTransactionFormatted={maxLimitTransaction}
      openChooseLimitPopup={openChooseLimitPopup}
      loading={loading}
      errorMessage={errorMessage}
    />
  )
}
