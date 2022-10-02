import React from 'react'
import { useStyles } from './TagChip.style'
import { Chip } from '@material-ui/core'

interface TagChipProps {
  label: string
  selected?: boolean
  disabled?: boolean
  onClick?: (_: string) => void
}

export const TagChip: React.FC<TagChipProps> = ({
  label,
  selected,
  disabled,
  onClick,
}) => {
  const styles = useStyles()
  return (
    <Chip
      className={styles.root}
      label={label}
      disabled={disabled}
      variant="outlined"
      onClick={() => onClick?.call(this, label)}
      data-test-id="tag-chip"
    />
  )
}
