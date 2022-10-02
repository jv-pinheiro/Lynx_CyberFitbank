import React from 'react'
import { useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix'
import { AdjustNightlyInternalView } from './AdjustNightlyInternal.view'

export const AdjustNightlyInternal: React.FC = () => {
  const history = useHistory()

  const onDefineNightLimitClick = React.useCallback(() => {
    history.push(PixRoutes.transfer)
  }, [])

  const onCancelButtonClick = React.useCallback(() => {
    history.push(PixRoutes.home)
  }, [])

  return (
    <AdjustNightlyInternalView
      onDefineNightLimitClick={onDefineNightLimitClick}
      onCancelButtonClick={onCancelButtonClick}
    />
  )
}
