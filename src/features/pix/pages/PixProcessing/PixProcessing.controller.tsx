import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixProcessingView } from './PixProcessing.view'
import { AccountRoutes } from 'features/account/constants/routes'

export const PixProcessing: React.FC = () => {
  const history = useHistory()

  const onCancelButtonClick = React.useCallback(() => {
    history.replace(AccountRoutes.home)
  }, [])

  return <PixProcessingView onCancelButtonClick={onCancelButtonClick} />
}
