import { KeyboardArrowLeft } from '@material-ui/icons'
import { returnLabel } from 'constants/buttons/labels'
import { useHistory } from 'react-router-dom'
import { useStyles } from './ProcessPageFooterButton.style'
import React from 'react'
import { Box } from '@material-ui/core'
import { Button } from 'components/Button'

interface ProcessPageFooterButtonProps {
  className?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  disabled?: boolean
  primary?: boolean
  onClick?: React.MouseEventHandler<any>
}

export const ProcessPageFooterButton: React.FC<
  ProcessPageFooterButtonProps
> = ({
  className,
  startIcon,
  endIcon,
  primary,
  disabled,
  onClick,
  children,
}) => {
  const history = useHistory()
  const styles = useStyles()

  const _className = (() => {
    return className ? `${styles.button} ${className}` : styles.button
  })()

  const _startIcon: React.ReactNode = (() => {
    if (endIcon) return undefined
    else if (startIcon) return startIcon
    else return <KeyboardArrowLeft />
  })()

  const _onClick = () => {
    history.goBack()
  }

  return (
    <Box className={_className}>
      <Button
        size="large"
        palette={primary ? 'primary' : 'secondary'}
        startIcon={_startIcon}
        endIcon={endIcon}
        disabled={disabled}
        onClick={onClick ?? _onClick}
      >
        {children ?? returnLabel}
      </Button>
    </Box>
  )
}
