import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { PixChangeReceiptView } from './PixChangeReceipt.view'

export const PixChangeReceipt: React.FC = () => {
  const history = useHistory()

  const onCloseButtonClick = React.useCallback(() => {
    history.push(PixRoutes.home)
  }, [])

  return <PixChangeReceiptView onCloseButtonClick={onCloseButtonClick} />
}
